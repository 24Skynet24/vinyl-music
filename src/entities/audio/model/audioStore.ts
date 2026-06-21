import { create } from "zustand"
import { TrackType } from "../../track"
import { AudioState } from "./types"

const initialPlaylist: TrackType[] = []
const PLAYBACK_STORAGE_KEY = "vinyl-music:playback-state"
let hasLoadedLibrary = false

interface PlaybackSnapshot {
  volume: number
  isMuted: boolean
  isRandom: boolean
  isRepeat: boolean
  isRepeatOne: boolean
  currentTrackId: string | null
  currentTime: number
  activePlaylistId: string | null
  queueTrackIds: string[]
  historyTrackIds: string[]
  historyIndex: number
}

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage)

const readPlaybackSnapshot = (): PlaybackSnapshot | null => {
  if (!canUseStorage()) return null

  try {
    const raw = window.localStorage.getItem(PLAYBACK_STORAGE_KEY)
    return raw ? JSON.parse(raw) as PlaybackSnapshot : null
  } catch {
    return null
  }
}

const writePlaybackSnapshot = (snapshot: PlaybackSnapshot) => {
  if (!canUseStorage()) return

  window.localStorage.setItem(PLAYBACK_STORAGE_KEY, JSON.stringify(snapshot))
}

const getTracksByIds = (tracks: TrackType[], ids: string[]) => {
  const tracksById = new Map(tracks.map((track) => [track.id, track]))

  return ids
    .map((id) => tracksById.get(id))
    .filter((track): track is TrackType => Boolean(track))
}

const createHistoryFromIds = (queue: TrackType[], historyTrackIds: string[]) =>
  historyTrackIds
    .map((trackId) => queue.findIndex((track) => track.id === trackId))
    .filter((index) => index >= 0)

const clampTime = (time: number, duration: number) =>
  duration > 0 ? Math.max(0, Math.min(time, duration)) : Math.max(0, time)

const initialSnapshot = readPlaybackSnapshot()

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  isRandom: initialSnapshot?.isRandom ?? false,
  isRepeat: initialSnapshot?.isRepeat ?? false,
  isRepeatOne: initialSnapshot?.isRepeatOne ?? false,
  volume: initialSnapshot?.volume ?? 1,
  isMuted: initialSnapshot?.isMuted ?? false,

  currentTime: 0,
  duration: initialPlaylist[0]?.duration ?? 0,
  libraryTracks: initialPlaylist,
  playList: initialPlaylist,
  activePlaylistId: null,
  currentIndex: 0,
  history: [0],
  historyIndex: 0,

  togglePlay: () => {
    const { isPlaying, playList } = get()
    if (!playList.length) return

    set({ isPlaying: !isPlaying })
  },

  tickProgress: () => {
    const { currentTime, duration, isRepeatOne, isRepeat, nextTrack } = get()

    if (currentTime >= duration) {
      if (isRepeatOne) {
        set({ currentTime: 0 })
      } else if (isRepeat) {
        nextTrack()
      } else {
        set({ isPlaying: false, currentTime: 0 })
      }
      return
    }

    set({ currentTime: currentTime + 1 })
  },

  selectTrack: (index) => {
    const { playList } = get()
    const targetTrack = playList[index]
    if (!targetTrack) return

    set({
      currentIndex: index,
      currentTime: 0,
      duration: targetTrack.duration,
    })
  },

  playTracksQueue: (tracks, playlistId = null) => {
    const firstTrack = tracks[0]
    if (!firstTrack) return

    set({
      playList: tracks,
      currentIndex: 0,
      currentTime: 0,
      duration: firstTrack.duration,
      history: [0],
      historyIndex: 0,
      isPlaying: true,
      activePlaylistId: playlistId,
    })
  },

  selectTracksQueueFrom: (tracks, trackId, playlistId = null, preserveProgress = false) => {
    const targetIndex = tracks.findIndex((track) => track.id === trackId)
    const targetTrack = tracks[targetIndex]
    if (!targetTrack) return

    set({
      playList: tracks,
      currentIndex: targetIndex,
      duration: targetTrack.duration,
      history: [targetIndex],
      historyIndex: 0,
      activePlaylistId: playlistId,
      ...(!preserveProgress && { currentTime: 0 }),
    })
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
    } = get()

    if (currentTime > 5) {
      set({ currentTime: 0 })
      return
    }

    if (historyIndex > 0) {
      const nextHistoryIndex = historyIndex - 1
      const targetTrackIndex = history[nextHistoryIndex]

      set({ historyIndex: nextHistoryIndex })
      selectTrack(targetTrackIndex)
      return
    }

    if (isRandom && playList.length > 1) {
      let randomIndex = currentIndex
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * playList.length)
      }

      set({
        history: [randomIndex, ...history],
        historyIndex: 0,
      })
      selectTrack(randomIndex)
      return
    }

    const prevIndex = currentIndex - 1
    const targetIndex = prevIndex >= 0 ? prevIndex : playList.length - 1

    set({
      history: [targetIndex, ...history],
      historyIndex: 0,
    })
    selectTrack(targetIndex)
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
    } = get()
    const updatedHistory = [...history, currentIndex]

    if (isRandom) {
      let randomIndex = currentIndex
      if (playList.length > 1) {
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * playList.length)
        }
      }
      set({
        history: updatedHistory,
        historyIndex: updatedHistory.length - 1,
      })
      selectTrack(randomIndex)
      return
    }

    const nextIndex = currentIndex + 1

    if (nextIndex < playList.length) {
      set({
        history: updatedHistory,
        historyIndex: updatedHistory.length - 1,
      })
      selectTrack(nextIndex)
    } else if (isRepeat || isRepeatOne) {
      set({
        history: updatedHistory,
        historyIndex: updatedHistory.length - 1,
      })
      selectTrack(0)
    } else {
      const firstTrack = playList[0]
      set({
        isPlaying: false,
        currentIndex: 0,
        currentTime: 0,
        duration: firstTrack?.duration ?? 0,
        history: [0],
        historyIndex: 0,
      })
    }
  },

  toggleRepeat: () => {
    const { isRepeat, isRepeatOne, currentIndex } = get()

    if (!isRepeat && !isRepeatOne) {
      set({ isRepeat: true, isRepeatOne: false })
    } else if (isRepeat && !isRepeatOne) {
      set({
        isRepeat: false,
        isRepeatOne: true,
        isRandom: false,
        history: [currentIndex],
        historyIndex: 0,
      })
    } else {
      set({
        isRepeat: false,
        isRepeatOne: false,
        isRandom: false,
        history: [currentIndex],
        historyIndex: 0,
      })
    }
  },

  toggleRandom: () =>
    set((state) => {
      const nextRandom = !state.isRandom

      return {
        isRandom: nextRandom,
        ...(nextRandom && {
          isRepeat: true,
          isRepeatOne: false,
        }),
      }
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

  setTracks: (tracks) => {
    hasLoadedLibrary = true

    const snapshot = readPlaybackSnapshot()
    const restoredQueue = snapshot?.queueTrackIds.length
      ? getTracksByIds(tracks, snapshot.queueTrackIds)
      : []
    const playList = restoredQueue.length ? restoredQueue : tracks
    const restoredTrackIndex = snapshot?.currentTrackId
      ? playList.findIndex((track) => track.id === snapshot.currentTrackId)
      : -1
    const currentIndex = restoredTrackIndex >= 0 ? restoredTrackIndex : 0
    const currentTrack = playList[currentIndex]
    const restoredHistory = snapshot
      ? createHistoryFromIds(playList, snapshot.historyTrackIds)
      : []
    const history = restoredHistory.length ? restoredHistory : [currentIndex]
    const historyIndex = Math.max(0, Math.min(snapshot?.historyIndex ?? 0, history.length - 1))
    const firstTrack = tracks[0]

    set({
      libraryTracks: tracks,
      playList,
      currentIndex,
      currentTime: currentTrack && snapshot
        ? clampTime(snapshot.currentTime, currentTrack.duration)
        : 0,
      duration: currentTrack?.duration ?? firstTrack?.duration ?? 0,
      history,
      historyIndex,
      isPlaying: false,
      isRandom: snapshot?.isRandom ?? false,
      isRepeat: snapshot?.isRepeat ?? false,
      isRepeatOne: snapshot?.isRepeatOne ?? false,
      volume: snapshot?.volume ?? 1,
      isMuted: snapshot?.isMuted ?? false,
      activePlaylistId: snapshot?.activePlaylistId ?? null,
    })
  },

  addTracks: (tracks) => {
    if (!tracks.length) return

    const { libraryTracks, playList, currentIndex, activePlaylistId } = get()
    const wasEmpty = libraryTracks.length === 0
    const isPlayingLibraryQueue =
      playList.length === libraryTracks.length &&
      playList.every((track, index) => track.id === libraryTracks[index]?.id)
    const updatedLibraryTracks = [...tracks, ...libraryTracks]
    const newPlayList = isPlayingLibraryQueue || wasEmpty ? updatedLibraryTracks : playList

    set({
      libraryTracks: updatedLibraryTracks,
      playList: newPlayList,
      currentIndex: isPlayingLibraryQueue && !wasEmpty ? currentIndex + tracks.length : currentIndex,
      ...(wasEmpty && { duration: tracks[0].duration }),
      ...(isPlayingLibraryQueue && { activePlaylistId }),
    })
  },

  removeTrackEverywhere: (trackId) => {
    const {
      libraryTracks,
      playList,
      currentIndex,
      currentTime,
      isPlaying,
      activePlaylistId,
    } = get()
    const currentTrack = playList[currentIndex]
    const removedQueueIndex = playList.findIndex((track) => track.id === trackId)
    const removedLibraryIndex = libraryTracks.findIndex((track) => track.id === trackId)
    const nextLibraryTracks = libraryTracks.filter((track) => track.id !== trackId)
    const nextQueue = playList.filter((track) => track.id !== trackId)

    if (removedQueueIndex < 0) {
      set({ libraryTracks: nextLibraryTracks })
      return
    }

    const isCurrentTrackRemoved = currentTrack?.id === trackId
    const nextTrack = isCurrentTrackRemoved
      ? nextQueue[removedQueueIndex] ?? nextQueue[0] ?? nextLibraryTracks[removedLibraryIndex] ?? nextLibraryTracks[0]
      : currentTrack

    if (!nextTrack) {
      set({
        libraryTracks: nextLibraryTracks,
        playList: [],
        currentIndex: 0,
        currentTime: 0,
        duration: 0,
        history: [0],
        historyIndex: 0,
        isPlaying: false,
        activePlaylistId: null,
      })
      return
    }

    const shouldFallbackToLibrary = nextQueue.length === 0
    const resolvedQueue = shouldFallbackToLibrary ? nextLibraryTracks : nextQueue
    const nextIndex = resolvedQueue.findIndex((track) => track.id === nextTrack.id)

    set({
      libraryTracks: nextLibraryTracks,
      playList: resolvedQueue,
      currentIndex: Math.max(0, nextIndex),
      currentTime: isCurrentTrackRemoved ? 0 : currentTime,
      duration: nextTrack.duration,
      history: [Math.max(0, nextIndex)],
      historyIndex: 0,
      isPlaying,
      activePlaylistId: shouldFallbackToLibrary ? null : activePlaylistId,
    })
  },
}))

useAudioStore.subscribe((state) => {
  const currentTrack = state.playList[state.currentIndex]
  const previousSnapshot = readPlaybackSnapshot()
  const hasLibraryTracks = state.libraryTracks.length > 0
  const shouldPersistTrackState = hasLoadedLibrary && hasLibraryTracks
  const shouldClearTrackState = hasLoadedLibrary && !hasLibraryTracks

  writePlaybackSnapshot({
    volume: state.volume,
    isMuted: state.isMuted,
    isRandom: state.isRandom,
    isRepeat: state.isRepeat,
    isRepeatOne: state.isRepeatOne,
    currentTrackId: shouldPersistTrackState
      ? currentTrack?.id ?? null
      : shouldClearTrackState ? null : previousSnapshot?.currentTrackId ?? null,
    currentTime: shouldPersistTrackState
      ? state.currentTime
      : shouldClearTrackState ? 0 : previousSnapshot?.currentTime ?? 0,
    activePlaylistId: shouldPersistTrackState
      ? state.activePlaylistId
      : shouldClearTrackState ? null : previousSnapshot?.activePlaylistId ?? null,
    queueTrackIds: shouldPersistTrackState
      ? state.playList.map((track) => track.id)
      : shouldClearTrackState ? [] : previousSnapshot?.queueTrackIds ?? [],
    historyTrackIds: shouldPersistTrackState
      ? state.history
        .map((index) => state.playList[index]?.id)
        .filter((trackId): trackId is string => Boolean(trackId))
      : shouldClearTrackState ? [] : previousSnapshot?.historyTrackIds ?? [],
    historyIndex: shouldPersistTrackState
      ? state.historyIndex
      : shouldClearTrackState ? 0 : previousSnapshot?.historyIndex ?? 0,
  })
})
