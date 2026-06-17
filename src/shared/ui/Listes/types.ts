import { TrackType } from "../../model/track"

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

    onDelete?: () => void
    onEdit?: () => void
}