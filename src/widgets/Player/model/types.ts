import { TrackType } from "../../../shared"

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

  playList: TrackType[]
  currentIndex: number
  
  togglePlay: () => void
  toggleRandom: () => void
  toggleRepeat: () => void
  setCurrentTime: (time: number) => void
  tickProgress: () => void
  
  prevTrack: () => void
  nextTrack: (autoNext?: boolean) => void
  selectTrack: (index: number) => void
}