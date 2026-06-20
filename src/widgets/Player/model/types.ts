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