import fs from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"
import { parseFile } from "music-metadata"
import { getLibraryPaths } from "./paths"
import { createMediaUrl, MEDIA_PROTOCOL, resolveMediaFilePath } from "./mediaProtocol"
import { TrackRecord } from "./types"

const safeFileName = (name: string) =>
  name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "file"

const copyMediaFile = async (sourcePath: string, targetDir: string) => {
  await fs.mkdir(targetDir, { recursive: true })

  const ext = path.extname(sourcePath)
  const baseName = safeFileName(path.basename(sourcePath, ext))
  const fileName = `${baseName}-${randomUUID()}${ext}`
  const targetPath = path.join(targetDir, fileName)

  await fs.copyFile(sourcePath, targetPath)

  return fileName
}

const getTrackMetadata = async (filePath: string) => {
  try {
    const metadata = await parseFile(filePath)

    return {
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      year: metadata.common.year ? String(metadata.common.year) : undefined,
      genre: metadata.common.genre,
      trackNumber: metadata.common.track.no ?? undefined,
      duration: metadata.format.duration ? Math.floor(metadata.format.duration) : undefined,
      bitrate: metadata.format.bitrate ? Math.floor(metadata.format.bitrate / 1000) : undefined,
    }
  } catch {
    return {}
  }
}

const needsMetadata = (track: TrackRecord) =>
  !track.artist || !track.album || !track.year || !track.genre?.length || !track.duration

export const enrichTrackMetadata = async (track: TrackRecord): Promise<TrackRecord> => {
  if (!track.src?.startsWith(`${MEDIA_PROTOCOL}://`) || !needsMetadata(track)) {
    return track
  }

  const metadata = await getTrackMetadata(resolveMediaFilePath(track.src))

  return {
    ...track,
    title: metadata.title || track.title,
    artist: metadata.artist || track.artist,
    album: metadata.album || track.album,
    year: metadata.year || track.year,
    genre: metadata.genre || track.genre,
    trackNumber: metadata.trackNumber || track.trackNumber,
    duration: metadata.duration || track.duration,
    bitrate: metadata.bitrate || track.bitrate,
  }
}

export const importAudioFiles = async (filePaths: string[]): Promise<TrackRecord[]> => {
  const { audioDir } = getLibraryPaths()

  return Promise.all(
    filePaths.map(async (sourcePath) => {
      const fileName = await copyMediaFile(sourcePath, audioDir)
      const title = path.basename(sourcePath, path.extname(sourcePath))
      const metadata = await getTrackMetadata(path.join(audioDir, fileName))

      return {
        id: randomUUID(),
        title: metadata.title || title,
        artist: metadata.artist,
        album: metadata.album,
        year: metadata.year,
        genre: metadata.genre,
        trackNumber: metadata.trackNumber,
        duration: metadata.duration ?? 0,
        bitrate: metadata.bitrate,
        src: createMediaUrl("audio", fileName),
      }
    })
  )
}

export const importCoverFile = async (sourcePath: string): Promise<string> => {
  const { coversDir } = getLibraryPaths()
  const fileName = await copyMediaFile(sourcePath, coversDir)

  return createMediaUrl("covers", fileName)
}
