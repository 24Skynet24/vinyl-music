export interface SlidingPanelProps {
    view: "musics" | "playlists" | "add-music"
    isClosing?: boolean
}

export interface SlidingPanelMusicsProps {
    onEditTrack: () => void
}

export interface SlidingPanelPlaylistsProps {
    onEdit: () => void
}

export interface SlidingPanelAddMusicsProps {
    onCancel: () => void
    onSave: () => void
}