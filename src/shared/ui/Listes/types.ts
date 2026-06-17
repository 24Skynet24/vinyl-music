import { TrackType } from "../../model/track"

export interface PlayListItemProps extends TrackType {
    onClick: () => void
    editPlaylist: () => void
    isSelected?: boolean
}