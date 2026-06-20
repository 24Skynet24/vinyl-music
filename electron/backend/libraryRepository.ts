import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { getLibraryPaths } from "./paths"
import { createMediaUrl } from "./mediaProtocol"
import { enrichTrackMetadata } from "./mediaService"
import { LibraryData, PlaylistRecord, TrackRecord } from "./types"

export const ALL_MUSIC_ID = "all-music"

const allMusicPlaylist: PlaylistRecord = {
  id: ALL_MUSIC_ID,
  title: "All music",
  description: "All your music",
  isLocked: true,
  trackIds: [],
}

const createEmptyLibrary = (): LibraryData => ({
  tracks: [],
  playlists: [allMusicPlaylist],
})

const ensureAllMusicPlaylist = (playlists: PlaylistRecord[]): PlaylistRecord[] => {
  const rest = playlists.filter((playlist) => playlist.id !== ALL_MUSIC_ID)

  return [allMusicPlaylist, ...rest]
}

const normalizeMediaUrl = (url: string | undefined, type: "audio" | "covers") => {
  if (!url || !url.startsWith("file://")) return url

  try {
    return createMediaUrl(type, path.basename(fileURLToPath(url)))
  } catch {
    return url
  }
}

const normalizeTracks = (tracks: TrackRecord[]) =>
  tracks.map((track) => ({
    ...track,
    src: normalizeMediaUrl(track.src, "audio"),
    img: normalizeMediaUrl(track.img, "covers"),
  }))

const normalizePlaylists = (playlists: PlaylistRecord[]) =>
  playlists.map((playlist) => ({
    ...playlist,
    img: normalizeMediaUrl(playlist.img, "covers"),
  }))

export const ensureLibraryStorage = async () => {
  const { root, audioDir, coversDir, libraryFile } = getLibraryPaths()

  await fs.mkdir(root, { recursive: true })
  await fs.mkdir(audioDir, { recursive: true })
  await fs.mkdir(coversDir, { recursive: true })

  try {
    await fs.access(libraryFile)
  } catch {
    await fs.writeFile(libraryFile, JSON.stringify(createEmptyLibrary(), null, 2), "utf-8")
  }
}

export const readLibrary = async (): Promise<LibraryData> => {
  await ensureLibraryStorage()

  const { libraryFile } = getLibraryPaths()
  const raw = await fs.readFile(libraryFile, "utf-8")
  const parsed = JSON.parse(raw) as Partial<LibraryData>
  const normalizedTracks = normalizeTracks(parsed.tracks ?? [])
  const tracks = await Promise.all(normalizedTracks.map(enrichTrackMetadata))
  const hasTrackUpdates = JSON.stringify(tracks) !== JSON.stringify(normalizedTracks)
  const playlists = ensureAllMusicPlaylist(normalizePlaylists(parsed.playlists ?? []))
  const library = { tracks, playlists }

  if (hasTrackUpdates) {
    await writeLibrary(library)
  }

  return library
}

export const writeLibrary = async (library: LibraryData): Promise<LibraryData> => {
  await ensureLibraryStorage()

  const nextLibrary = {
    tracks: library.tracks,
    playlists: ensureAllMusicPlaylist(library.playlists),
  }

  const { libraryFile } = getLibraryPaths()
  await fs.writeFile(libraryFile, JSON.stringify(nextLibrary, null, 2), "utf-8")

  return nextLibrary
}

export const saveTracks = async (tracks: TrackRecord[]): Promise<LibraryData> => {
  const library = await readLibrary()
  const updatedTracks = library.tracks.map((track) => {
    const updated = tracks.find((item) => item.id === track.id)

    return updated ? { ...track, ...updated } : track
  })
  const existingIds = new Set(updatedTracks.map((track) => track.id))
  const newTracks = tracks.filter((track) => !existingIds.has(track.id))

  return writeLibrary({
    ...library,
    tracks: [...newTracks, ...updatedTracks],
  })
}
