import { TrackType } from "../../../entities/track"

export interface SlidingPanelProps {
    view: "musics" | "playlists" | "add-music"
    isClosing?: boolean
}

export interface SlidingPanelMusicsProps {
    onEditTrack: (trackId: string) => void
    playlistId?: string | null
    onBack?: () => void
}

export interface SlidingPanelPlaylistsProps {
    onEdit: (playlistId: string) => void
    onCreate: () => void
    onOpenMusics: (playlistId: string) => void
}

export interface SlidingPanelAddMusicsProps {
    onCancel: () => void
    onSave: (tracks: TrackType[]) => void
}