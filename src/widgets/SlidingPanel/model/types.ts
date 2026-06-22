import { TrackType } from "../../../entities/track"
import { PanelView } from "../../../features/Navigation/model/views"

export type MusicSortType = "title" | "artist" | "album" | "duration" | "dateAdded"
export type PlaylistSortType = "title" | "tracksCount"

export interface SlidingPanelProps {
    view: PanelView
    isClosing?: boolean
}

export interface SlidingPanelMusicsProps {
    onEditTrack: (trackId: string) => void
    playlistId?: string | null
    onBack?: () => void
    searchQuery?: string
    sortType?: MusicSortType
}

export interface SlidingPanelPlaylistsProps {
    onEdit: (playlistId: string) => void
    onCreate: () => void
    onOpenMusics: (playlistId: string) => void
    searchQuery?: string
    playlistSortType?: PlaylistSortType
    musicSortType?: MusicSortType
    onActivePlaylistViewChange?: (isVisible: boolean) => void
}

export interface SlidingPanelAddMusicsProps {
    onCancel: () => void
    onSave: (tracks: TrackType[]) => void
}