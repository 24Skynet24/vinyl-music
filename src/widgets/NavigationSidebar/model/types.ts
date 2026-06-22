import { PanelView } from "../../../features/Navigation/model/views"

export interface NavigationSidebarItemType {
    id: number
    name: string
    isPlaying?: boolean
    view: PanelView
}