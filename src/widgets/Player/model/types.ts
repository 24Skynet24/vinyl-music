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