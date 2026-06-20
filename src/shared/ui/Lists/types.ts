import { TrackType } from "../../../entities/track"

export interface PlayListTrackProps extends TrackType {
    isSelected?: boolean
    isNewTrack?: boolean

    onClick?: () => void
    editPlaylist?: () => void
    removeNewTrack?: () => void
}

export interface PlayListItemProps  {
    id: string | number
    title: string
    musicCount: number
    isSelected: boolean
    description?: string
    img?: string

    isEditTrack?: boolean
    isHaveTrack?: boolean
    isLocked?: boolean

    onClick?: () => void
    onPlay?: () => void
    onDelete?: () => void
    onEdit?: () => void

    onAddTrack?: () => void
    onRemoveTrack?: () => void
}
