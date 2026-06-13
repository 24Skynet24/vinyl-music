export interface PlayListItemProps {
    musicName: string
    duration: number
    isPlaying: boolean
    img?: string
    authorName?: string
    albumName?: string
    
    onClick: () => void
}