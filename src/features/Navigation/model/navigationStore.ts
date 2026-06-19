import { create } from 'zustand'
import { NavigationState } from '../types'

const PANEL_ANIMATION_MS = 550
let timeoutId: number | null = null

export const useNavigationStore = create<NavigationState>((set, get) => ({
  panelView: null,
  modalView: null,
  isPanelClosing: false,
  editTrackId: null,
  editPlaylistId: null,
  selectedPlaylistId: null,

  openPanel: (view) => {
    if (timeoutId) window.clearTimeout(timeoutId)
    set({ isPanelClosing: false, panelView: view, selectedPlaylistId: null })
  },

  openPlaylistMusics: (playlistId) => {
    if (timeoutId) window.clearTimeout(timeoutId)
    set({ isPanelClosing: false, panelView: 'musics', selectedPlaylistId: playlistId })
  },

  closePanel: () => {
    const { panelView, isPanelClosing } = get()
    if (!panelView || isPanelClosing) return

    set({ isPanelClosing: true })

    timeoutId = window.setTimeout(() => {
      set({ panelView: null, modalView: null, isPanelClosing: false, selectedPlaylistId: null })
      timeoutId = null
    }, PANEL_ANIMATION_MS)
  },

  openEditTrack: (trackId) => set({ modalView: 'editTrack', editTrackId: trackId }),
  openEditPlaylist: (playlistId = null) => set({ modalView: 'editPlaylist', editPlaylistId: playlistId }),
  closeModal: () => set({ modalView: null, editTrackId: null, editPlaylistId: null }),
}))