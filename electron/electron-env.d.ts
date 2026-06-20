/// <reference types="vite-plugin-electron/electron-env" />

import type { LibraryData, PlaylistInput, TrackRecord } from './backend/types'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * The built directory structure
       *
       * ```tree
       * ├─┬─┬ dist
       * │ │ └── index.html
       * │ │
       * │ ├─┬ dist-electron
       * │ │ ├── main.js
       * │ │ └── preload.js
       * │
       * ```
       */
      APP_ROOT: string
      /** /dist/ or /public/ */
      VITE_PUBLIC: string
    }
  }

  interface VinylApi {
    loadLibrary: () => Promise<LibraryData>
    selectAudioFiles: () => Promise<TrackRecord[]>
    saveTracks: (tracks: TrackRecord[]) => Promise<LibraryData>
    createPlaylist: (data: PlaylistInput) => Promise<LibraryData>
    updatePlaylist: (id: string, data: PlaylistInput) => Promise<LibraryData>
    deletePlaylist: (id: string) => Promise<LibraryData>
    toggleTrackInPlaylist: (playlistId: string, trackId: string) => Promise<LibraryData>
    selectPlaylistCover: () => Promise<string | null>
  }

  interface Window {
    vinylApi: VinylApi
  }
}

export {}
