import { create } from "zustand";
import { AudioState } from "./types";
import testData from "../../../entities/track/model/testData.json";

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
    history: [0],
    historyIndex: 0,

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

      if (isPlaying) startTimer();
    },

    prevTrack: () => {
      const {
        currentTime,
        currentIndex,
        playList,
        isRandom,
        history,
        historyIndex,
        selectTrack,
      } = get();

      if (currentTime > 5) {
        set({ currentTime: 0 });
        return;
      }

      if (historyIndex > 0) {
        const nextHistoryIndex = historyIndex - 1;
        const targetTrackIndex = history[nextHistoryIndex];

        set({ historyIndex: nextHistoryIndex });
        selectTrack(targetTrackIndex);
        return;
      }

      if (isRandom && playList.length > 1) {
        let randomIndex = currentIndex;
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * playList.length);
        }

        set({
          history: [randomIndex, ...history],
          historyIndex: 0,
        });
        selectTrack(randomIndex);
        return;
      }

      const prevIndex = currentIndex - 1;
      const targetIndex = prevIndex >= 0 ? prevIndex : playList.length - 1;

      set({
        history: [targetIndex, ...history],
        historyIndex: 0,
      });
      selectTrack(targetIndex);
    },

    nextTrack: () => {
      const {
        currentIndex,
        playList,
        isRandom,
        isRepeat,
        isRepeatOne,
        history,
        selectTrack,
      } = get();

      // Save currentIndex before new track
      const updatedHistory = [...history, currentIndex];

      if (isRandom) {
        let randomIndex = currentIndex;
        if (playList.length > 1) {
          while (randomIndex === currentIndex) {
            randomIndex = Math.floor(Math.random() * playList.length);
          }
        }
        set({
          history: updatedHistory,
          historyIndex: updatedHistory.length - 1,
        });
        selectTrack(randomIndex);
        return;
      }

      const nextIndex = currentIndex + 1;

      if (nextIndex < playList.length) {
        set({
          history: updatedHistory,
          historyIndex: updatedHistory.length - 1,
        });
        selectTrack(nextIndex);
      } else if (isRepeat || isRepeatOne) {
        set({
          history: updatedHistory,
          historyIndex: updatedHistory.length - 1,
        });
        selectTrack(0);
      } else {
        clearTimer();
        const firstTrack = playList[0];
        set({
          isPlaying: false,
          currentIndex: 0,
          currentTime: 0,
          duration: firstTrack?.duration ?? 180,
          history: [0],
          historyIndex: 0,
        });
      }
    },

    toggleRepeat: () => {
      const { isRepeat, isRepeatOne, currentIndex } = get();

      if (!isRepeat && !isRepeatOne) {
        set({ isRepeat: true, isRepeatOne: false });
      } else if (isRepeat && !isRepeatOne) {
        // repeat-one -> no-random
        set({
          isRepeat: false,
          isRepeatOne: true,
          isRandom: false,
          history: [currentIndex], // clean history
          historyIndex: 0,
        });
      } else {
        // no-rpeat -> no-random
        set({
          isRepeat: false,
          isRepeatOne: false,
          isRandom: false,
          history: [currentIndex], // clean history
          historyIndex: 0,
        });
      }
    },

    toggleRandom: () =>
      set((state) => {
        const nextRandom = !state.isRandom;

        return {
          isRandom: nextRandom,
          // if random -> repeat
          ...(nextRandom && {
            isRepeat: true,
            isRepeatOne: false,
          }),
        };
      }),

    setCurrentTime: (time) => set({ currentTime: time }),
  };
});
