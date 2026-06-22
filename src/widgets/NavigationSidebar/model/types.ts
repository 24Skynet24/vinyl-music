export interface NavigationSidebarProps {
    onOpenPanel: (view: "musics" | "playlists") => void
}

export interface NavigationSidebarItemType {
    id: number
    name: string
    isPlaying?: boolean
    view: "musics" | "playlists" | "add-music" | "equalizer"
}