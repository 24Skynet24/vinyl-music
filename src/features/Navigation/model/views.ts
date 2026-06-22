export const PANEL_VIEWS = {
  musics: "musics",
  playlists: "playlists",
  addMusic: "add-music",
  equalizer: "equalizer",
} as const

export type PanelView = typeof PANEL_VIEWS[keyof typeof PANEL_VIEWS]

export const MODAL_VIEWS = {
  editTrack: "editTrack",
  editPlaylist: "editPlaylist",
} as const

export type ModalView = typeof MODAL_VIEWS[keyof typeof MODAL_VIEWS]
