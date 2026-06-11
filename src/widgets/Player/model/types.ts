export interface PlayerDiskProps {
  isPlaying: boolean
}

export interface PlayerInfoTextProps {
  musicName: string
  authorName?: string
  albumName?: string
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


  togglePlay: () => void
  toggleRandom: () => void
  toggleRepeat: () => void
  setCurrentTime: (time: number) => void
  tickProgress: () => void
  
  prevTrack: () => void
  nextTrack: () => void
}