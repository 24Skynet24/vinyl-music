import { create } from 'zustand'
import { NavigationState } from '../types'

const PANEL_ANIMATION_MS = 550
let timeoutId: number | null = null

export const useNavigationStore = create<NavigationState>((set, get) => ({
  panelView: null,
  modalView: null,
  isPanelClosing: false,

  openPanel: (view) => {
    if (timeoutId) window.clearTimeout(timeoutId)
    set({ isPanelClosing: false, panelView: view })
  },

  closePanel: () => {
    const { panelView, isPanelClosing } = get()
    if (!panelView || isPanelClosing) return

    set({ isPanelClosing: true })

    timeoutId = window.setTimeout(() => {
      set({ panelView: null, modalView: null, isPanelClosing: false })
      timeoutId = null
    }, PANEL_ANIMATION_MS)
  },

  openModal: (view) => set({ modalView: view }),
  closeModal: () => set({ modalView: null }),
}))