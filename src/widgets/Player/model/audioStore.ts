import { create } from "zustand";
import { AudioState } from "./types";
import { TrackType } from "../../../entities/track";
// import testData from "../../../entities/track/model/testData.json";

// const initialPlaylist = testData.data;
const initialPlaylist: TrackType[] = [];

export const useAudioStore = create<AudioState>((set, get) => {
  return {
    // Statuses
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isRepeatOne: false,
    volume: 1,
    isMuted: false,

    // Time & Playlist
    currentTime: 0,
    duration: initialPlaylist[0]?.duration ?? 0,
    libraryTracks: initialPlaylist,
    playList: initialPlaylist,
    currentIndex: 0,
    history: [0],
    historyIndex: 0,

    togglePlay: () => {
      const { isPlaying, playList } = get();
      if (!playList.length) return;

      set({ isPlaying: !isPlaying });
    },

    tickProgress: () => {
      const { currentTime, duration, isRepeatOne, isRepeat, nextTrack } = get();

      if (currentTime >= duration) {
        if (isRepeatOne) {
          set({ currentTime: 0 });
        } else if (isRepeat) {
          nextTrack();
        } else {
          set({ isPlaying: false, currentTime: 0 });
        }
      } else {
        set({ currentTime: currentTime + 1 });
      }
    },

    selectTrack: (index: number) => {
      const { playList } = get();
      const targetTrack = playList[index];
      if (!targetTrack) return;

      set({
        currentIndex: index,
        currentTime: 0,
        duration: targetTrack.duration,
      });
    },

    playTracksQueue: (tracks: TrackType[]) => {
      const firstTrack = tracks[0];
      if (!firstTrack) return;

      set({
        playList: tracks,
        currentIndex: 0,
        currentTime: 0,
        duration: firstTrack.duration,
        history: [0],
        historyIndex: 0,
        isPlaying: true,
      });
    },

    selectTracksQueueFrom: (tracks: TrackType[], trackId: string) => {
      const targetIndex = tracks.findIndex((track) => track.id === trackId);
      const targetTrack = tracks[targetIndex];
      if (!targetTrack) return;

      set({
        playList: tracks,
        currentIndex: targetIndex,
        currentTime: 0,
        duration: targetTrack.duration,
        history: [targetIndex],
        historyIndex: 0,
      });
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
        const firstTrack = playList[0];
        set({
          isPlaying: false,
          currentIndex: 0,
          currentTime: 0,
          duration: firstTrack?.duration ?? 0,
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

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setDuration: (duration) =>
      set((state) => ({
        duration,
        currentTime: duration > 0 ? Math.min(state.currentTime, duration) : state.currentTime,
      })),
    setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)), isMuted: volume === 0 }),
    setCurrentTime: (time) =>
      set((state) => ({
        currentTime: state.duration > 0
          ? Math.max(0, Math.min(time, state.duration))
          : Math.max(0, time),
      })),
    updateTrackDuration: (trackId, duration) =>
      set((state) => ({
        libraryTracks: state.libraryTracks.map((track) =>
          track.id === trackId ? { ...track, duration } : track
        ),
        playList: state.playList.map((track) =>
          track.id === trackId ? { ...track, duration } : track
        ),
        ...(state.playList[state.currentIndex]?.id === trackId && { duration }),
      })),

    setTracks: (tracks: TrackType[]) => {
      const firstTrack = tracks[0];

      set({
        libraryTracks: tracks,
        playList: tracks,
        currentIndex: 0,
        currentTime: 0,
        duration: firstTrack?.duration ?? 0,
        history: [0],
        historyIndex: 0,
        isPlaying: false,
      });
    },

    addTracks: (tracks: TrackType[]) => {
      if (!tracks.length) return;

      const { libraryTracks, playList, currentIndex } = get();
      const wasEmpty = libraryTracks.length === 0;
      const isPlayingLibraryQueue =
        playList.length === libraryTracks.length &&
        playList.every((track, index) => track.id === libraryTracks[index]?.id);
      const updatedLibraryTracks = [...tracks, ...libraryTracks];
      const newPlayList = isPlayingLibraryQueue || wasEmpty ? updatedLibraryTracks : playList;

      set({
        libraryTracks: updatedLibraryTracks,
        playList: newPlayList,
        currentIndex: isPlayingLibraryQueue && !wasEmpty ? currentIndex + tracks.length : currentIndex,
        ...(wasEmpty && { duration: tracks[0].duration }),
      });
    },
  };
});
