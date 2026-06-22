import { ModalView, PanelView } from "./model/views"

export interface NavigationState {
  panelView: PanelView | null
  modalView: ModalView | null
  isPanelClosing: boolean
  editTrackId: string | null
  editPlaylistId: string | null
  selectedPlaylistId: string | null

  openPanel: (view: PanelView) => void
  openPlaylistMusics: (playlistId: string) => void
  closePanel: () => void
  openEditTrack: (trackId: string) => void
  openEditPlaylist: (playlistId?: string | null) => void
  closeModal: () => void
}
