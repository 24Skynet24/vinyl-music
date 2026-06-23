import { BrowserWindow, OpenDialogOptions, dialog, ipcMain } from "electron"
import { randomUUID } from "node:crypto"
import { ALL_MUSIC_ID, deleteTrack, readLibrary, saveTracks, writeLibrary } from "./libraryRepository"
import { AUDIO_FILE_EXTENSIONS, importAudioFiles, importCoverFile } from "./mediaService"
import { PlaylistInput, PlaylistRecord, TrackRecord } from "./types"

const audioFilters = [
  { name: "Audio", extensions: AUDIO_FILE_EXTENSIONS },
]

const imageFilters = [
  { name: "Images", extensions: ["png", "jpg", "jpeg", "webp"] },
]

const showOpenDialog = (options: OpenDialogOptions) => {
  const window = BrowserWindow.getFocusedWindow()

  return window
    ? dialog.showOpenDialog(window, options)
    : dialog.showOpenDialog(options)
}

const isLockedPlaylist = (playlist?: PlaylistRecord) =>
  !playlist || playlist.id === ALL_MUSIC_ID || playlist.isLocked

export const registerBackendIpc = () => {
  ipcMain.handle("library:load", async () => readLibrary())

  ipcMain.handle("tracks:select-audio", async () => {
    const result = await showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: audioFilters,
    })

    if (result.canceled) return []

    return importAudioFiles(result.filePaths)
  })

  ipcMain.handle("tracks:import-audio-files", async (_event, filePaths: string[]) =>
    importAudioFiles(filePaths)
  )

  ipcMain.handle("tracks:save", async (_event, tracks: TrackRecord[]) =>
    saveTracks(tracks)
  )

  ipcMain.handle("tracks:delete", async (_event, trackId: string) =>
    deleteTrack(trackId)
  )

  ipcMain.handle("playlists:create", async (_event, data: PlaylistInput) => {
    const library = await readLibrary()

    const playlist: PlaylistRecord = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      img: data.img,
      trackIds: [],
    }

    return writeLibrary({
      ...library,
      playlists: [...library.playlists, playlist],
    })
  })

  ipcMain.handle("playlists:update", async (_event, id: string, data: PlaylistInput) => {
    const library = await readLibrary()

    return writeLibrary({
      ...library,
      playlists: library.playlists.map((playlist) =>
        playlist.id === id && !playlist.isLocked
          ? {
              ...playlist,
              title: data.title,
              description: data.description,
              img: data.img,
            }
          : playlist
      ),
    })
  })

  ipcMain.handle("playlists:delete", async (_event, id: string) => {
    const library = await readLibrary()

    return writeLibrary({
      ...library,
      playlists: library.playlists.filter(
        (playlist) => playlist.id !== id || playlist.isLocked
      ),
    })
  })

  ipcMain.handle("playlists:toggle-track", async (_event, playlistId: string, trackId: string) => {
    const library = await readLibrary()

    return writeLibrary({
      ...library,
      playlists: library.playlists.map((playlist) => {
        if (playlist.id !== playlistId || isLockedPlaylist(playlist)) return playlist

        const hasTrack = playlist.trackIds.includes(trackId)

        return {
          ...playlist,
          trackIds: hasTrack
            ? playlist.trackIds.filter((id) => id !== trackId)
            : [...playlist.trackIds, trackId],
        }
      }),
    })
  })

  ipcMain.handle("covers:select", async () => {
    const result = await showOpenDialog({
      properties: ["openFile"],
      filters: imageFilters,
    })

    if (result.canceled || !result.filePaths[0]) return null

    return importCoverFile(result.filePaths[0])
  })
}
