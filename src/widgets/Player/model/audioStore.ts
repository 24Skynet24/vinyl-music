import { create } from "zustand";
import { AudioState } from "./types";
import testData from "./testData.json";

const initialPlaylist = testData.data;

export const useAudioStore = create<AudioState>((set, get) => {
  let timerInterval: NodeJS.Timeout | null = null;

  const clearTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    timerInterval = setInterval(() => {
      get().tickProgress();
    }, 1000);
  };

  return {
    // Statuses
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isRepeatOne: false,

    // Time & Playlist
    currentTime: 0,
    duration: initialPlaylist[0]?.duration ?? 180,
    playList: initialPlaylist,
    currentIndex: 0,

    togglePlay: () => {
      const { isPlaying } = get();
      const nextState = !isPlaying;

      if (nextState) {
        startTimer();
      } else {
        clearTimer();
      }

      set({ isPlaying: nextState });
    },

    tickProgress: () => {
      const { currentTime, duration, isRepeatOne, isRepeat, nextTrack } = get();

      if (currentTime >= duration) {
        if (isRepeatOne) {
          set({ currentTime: 0 });
        } else if (isRepeat) {
          nextTrack();
        } else {
          clearTimer();
          set({ isPlaying: false, currentTime: 0 });
        }
      } else {
        set({ currentTime: currentTime + 1 });
      }
    },

    selectTrack: (index: number) => {
      const { playList, isPlaying } = get();
      const targetTrack = playList[index];
      if (!targetTrack) return;

      set({
        currentIndex: index,
        currentTime: 0,
        duration: targetTrack.duration,
      });

      // If player was playeing, timer must restart for new track
      if (isPlaying) startTimer();
    },

    prevTrack: () => {
      const { currentTime, currentIndex, playList, selectTrack } = get();

      if (currentTime > 5) {
        set({ currentTime: 0 });
        return;
      }

      const prevIndex = currentIndex - 1;
      const targetIndex = prevIndex >= 0 ? prevIndex : playList.length - 1;
      selectTrack(targetIndex);
    },

    nextTrack: () => {
      const { currentIndex, playList, isRandom, isRepeat, selectTrack } = get();

      if (isRandom) {
        const randomIndex = Math.floor(Math.random() * playList.length);
        selectTrack(randomIndex);
        return;
      }

      const nextIndex = currentIndex + 1;

      if (nextIndex < playList.length) {
        selectTrack(nextIndex);
      } else if (isRepeat) {
        selectTrack(0);
      } else {
        clearTimer();
        const firstTrack = playList[0];
        set({
          isPlaying: false,
          currentIndex: 0,
          currentTime: 0,
          duration: firstTrack?.duration ?? 180,
        });
      }
    },

    toggleRepeat: () => {
      const { isRepeat, isRepeatOne } = get();
      if (!isRepeat && !isRepeatOne)
        set({ isRepeat: true, isRepeatOne: false });
      else if (isRepeat && !isRepeatOne)
        set({ isRepeat: false, isRepeatOne: true });
      else set({ isRepeat: false, isRepeatOne: false });
    },

    setCurrentTime: (time) => set({ currentTime: time }),
    toggleRandom: () => set((state) => ({ isRandom: !state.isRandom })),
  };
});
