export interface NavigationState {
  panelView: 'musics' | 'playlists' | 'add-music' | 'equalizer' | null
  modalView: 'editTrack' | 'editPlaylist' | null
  isPanelClosing: boolean
  editTrackId: string | null
  editPlaylistId: string | null
  selectedPlaylistId: string | null

  openPanel: (view: 'musics' | 'playlists' | 'add-music' | 'equalizer') => void
  openPlaylistMusics: (playlistId: string) => void
  closePanel: () => void
  openEditTrack: (trackId: string) => void
  openEditPlaylist: (playlistId?: string | null) => void
  closeModal: () => void
}
