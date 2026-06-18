export interface SlidingPanelProps {
    view: "musics" | "playlists"
    isClosing?: boolean
}

export interface SlidingPanelMusicsProps {
    onEditTrack: () => void
}

export interface SlidingPanelPlaylistsProps {
    onEdit: () => void
}