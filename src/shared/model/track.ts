export interface TrackType {
    id: string
    title: string
    duration: number
    artist?: string // Скорректировано
    album?: string  // Скорректировано
    year?: string
    img?: string
    src?: string
    bitrate?: number
    trackNumber?: number
    genre?: string[]
    lyrics?: string
    isLiked?: boolean
}