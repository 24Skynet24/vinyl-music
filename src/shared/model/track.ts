export interface TrackType {
    id: string
    title: string
    duration: number
    isPlaying: boolean
    img?: string
    authorName?: string
    albumName?: string

    year?: string
    
    src?: string
    bitrate?: number
    trackNumber?: number
    genre?: string[]
    lyrics?: string
    isLiked?: boolean
}