import { ipcRenderer, contextBridge } from 'electron'
import type { LibraryData, PlaylistInput, TrackRecord } from './backend/types'

const vinylApi = {
  loadLibrary: (): Promise<LibraryData> =>
    ipcRenderer.invoke('library:load'),

  selectAudioFiles: (): Promise<TrackRecord[]> =>
    ipcRenderer.invoke('tracks:select-audio'),

  saveTracks: (tracks: TrackRecord[]): Promise<LibraryData> =>
    ipcRenderer.invoke('tracks:save', tracks),

  deleteTrack: (trackId: string): Promise<LibraryData> =>
    ipcRenderer.invoke('tracks:delete', trackId),

  createPlaylist: (data: PlaylistInput): Promise<LibraryData> =>
    ipcRenderer.invoke('playlists:create', data),

  updatePlaylist: (id: string, data: PlaylistInput): Promise<LibraryData> =>
    ipcRenderer.invoke('playlists:update', id, data),

  deletePlaylist: (id: string): Promise<LibraryData> =>
    ipcRenderer.invoke('playlists:delete', id),

  toggleTrackInPlaylist: (playlistId: string, trackId: string): Promise<LibraryData> =>
    ipcRenderer.invoke('playlists:toggle-track', playlistId, trackId),

  selectPlaylistCover: (): Promise<string | null> =>
    ipcRenderer.invoke('covers:select'),
}

contextBridge.exposeInMainWorld('vinylApi', vinylApi)
