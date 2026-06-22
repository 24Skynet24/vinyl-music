export interface TrackRecord {
  id: string
  title: string
  duration: number
  artist?: string
  album?: string
  year?: string
  img?: string
  src?: string
  bitrate?: number
  trackNumber?: number
  genre?: string[]
  lyrics?: string
  isLiked?: boolean
  addedAt?: string
}

export interface PlaylistRecord {
  id: string
  title: string
  description?: string
  img?: string
  isLocked?: boolean
  trackIds: string[]
}

export interface PlaylistInput {
  title: string
  description?: string
  img?: string
}

export interface LibraryData {
  tracks: TrackRecord[]
  playlists: PlaylistRecord[]
}
