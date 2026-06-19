export interface NavigationState {
  panelView: 'musics' | 'playlists' | 'add-music' | null
  modalView: 'editTrack' | 'editPlaylist' | null
  isPanelClosing: boolean
  
  openPanel: (view: 'musics' | 'playlists' | 'add-music') => void
  closePanel: () => void
  openModal: (view: 'editTrack' | 'editPlaylist') => void
  closeModal: () => void
}