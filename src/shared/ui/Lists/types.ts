import { TrackType } from "../../../entities/track"

export interface PlayListTrackProps extends TrackType {
    isSelected?: boolean

    onClick: () => void
    editPlaylist: () => void
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

    onDelete?: () => void
    onEdit?: () => void

    onAddTrack?: () => void
    onRemoveTrack?: () => void
}
