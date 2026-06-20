import { vinylApi } from "../../../shared/api/vinylApi"
import { getAudioDuration } from "../../../shared/lib"

/**
 * Opens the native Electron file picker and imports selected audio files
 * into the app data media directory.
 */
export const readAudioFiles = async () => {
    const tracks = await vinylApi.selectAudioFiles()

    return Promise.all(
        tracks.map(async (track) => ({
            ...track,
            duration: track.src ? await getAudioDuration(track.src) : track.duration,
        }))
    )
}
