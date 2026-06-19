export interface PlaylistType {
    id: string
    title: string
    description?: string
    img?: string
    isLocked?: boolean
    trackIds: string[]
}

export interface PlaylistInput {
    title: string
    description?: string
    img?: string
}

export interface PlaylistState {
    playlists: PlaylistType[]

    addPlaylist: (data: PlaylistInput) => void
    updatePlaylist: (id: string, data: PlaylistInput) => void
    deletePlaylist: (id: string) => void
    toggleTrackInPlaylist: (playlistId: string, trackId: string) => void
}
