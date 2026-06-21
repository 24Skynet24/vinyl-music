import { TrackType } from "../../track"
import { EqualizerBandId, EqualizerBandValues, EqualizerPreset, EqualizerPresetId } from "./equalizer"

export interface AudioState {
  isPlaying: boolean
  currentTime: number
  duration: number
  isRandom: boolean
  isRepeat: boolean
  isRepeatOne: boolean
  volume: number
  isMuted: boolean
  equalizerPresetId: EqualizerPresetId | null
  equalizerValues: EqualizerBandValues
  customEqualizerPresets: EqualizerPreset[]

  currentIndex: number
  historyIndex: number
  history: number[]
  libraryTracks: TrackType[]
  playList: TrackType[]
  activePlaylistId: string | null
  
  togglePlay: () => void
  toggleRandom: () => void
  toggleRepeat: () => void
  toggleMute: () => void
  setIsPlaying: (isPlaying: boolean) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  setEqualizerBand: (bandId: EqualizerBandId, gain: number) => void
  setEqualizerPreset: (presetId: EqualizerPresetId) => void
  createEqualizerPreset: (label: string) => void
  renameEqualizerPreset: (presetId: EqualizerPresetId, label: string) => void
  deleteEqualizerPreset: (presetId: EqualizerPresetId) => void
  resetEqualizer: () => void
  updateTrackDuration: (trackId: string, duration: number) => void
  tickProgress: () => void
  
  prevTrack: () => void
  nextTrack: (autoNext?: boolean) => void
  selectTrack: (index: number) => void
  playTracksQueue: (tracks: TrackType[], playlistId?: string | null) => void
  selectTracksQueueFrom: (tracks: TrackType[], trackId: string, playlistId?: string | null, preserveProgress?: boolean) => void
  setTracks: (tracks: TrackType[]) => void
  addTracks: (tracks: TrackType[]) => void
  removeTrackEverywhere: (trackId: string) => void
}
