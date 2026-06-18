export interface NavigationState {
  panelView: 'musics' | 'playlists' | null
  modalView: 'editTrack' | 'editPlaylist' | null
  isPanelClosing: boolean
  
  openPanel: (view: 'musics' | 'playlists') => void
  closePanel: () => void
  openModal: (view: 'editTrack' | 'editPlaylist') => void
  closeModal: () => void
}