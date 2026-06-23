import { vinylApi } from "../../../shared/api/vinylApi"
import { getAudioDuration } from "../../../shared/lib"

/**
 * Imports selected or dropped audio files into the app data media directory.
 * When no paths are provided, opens the native Electron file picker.
 */
export const readAudioFiles = async (filePaths?: string[]) => {
    const tracks = filePaths
        ? await vinylApi.importAudioFiles(filePaths)
        : await vinylApi.selectAudioFiles()

    return Promise.all(
        tracks.map(async (track) => ({
            ...track,
            duration: track.src ? await getAudioDuration(track.src) : track.duration,
        }))
    )
}
