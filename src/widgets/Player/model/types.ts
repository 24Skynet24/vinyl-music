import { TrackType } from "../../../entities/track"

export interface PlayerDiskProps {
  isPlaying: boolean
}

export interface PlayerInfoTextProps {
  title: string
  artist?: string
  album?: string
  year?: string | number
}

export interface PlayerTimeLineProps {
  duration: number
  isPlaying: boolean
}

export interface AudioState {
  isPlaying: boolean
  currentTime: number
  duration: number
  isRandom: boolean
  isRepeat: boolean
  isRepeatOne: boolean
  volume: number
  isMuted: boolean

  currentIndex: number
  historyIndex: number
  history: number[]
  playList: TrackType[]
  
  togglePlay: () => void
  toggleRandom: () => void
  toggleRepeat: () => void
  toggleMute: () => void
  setIsPlaying: (isPlaying: boolean) => void
  setDuration: (duration: number) => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  tickProgress: () => void
  
  prevTrack: () => void
  nextTrack: (autoNext?: boolean) => void
  selectTrack: (index: number) => void
  addTracks: (tracks: TrackType[]) => void
}