import { TrackType } from "../../../entities/track"

const getDuration = (url: string): Promise<number> =>
    new Promise((resolve) => {
        const audio = document.createElement("audio")
        audio.preload = "metadata"
        audio.onloadedmetadata = () => resolve(Math.floor(audio.duration) || 0)
        audio.onerror = () => resolve(0)
        audio.src = url
    })

/**
 * Turns selected audio files into tracks, reading the real duration from
 * the file and using its name (without extension) as the title.
 */
export const readAudioFiles = async (files: FileList | File[]): Promise<TrackType[]> => {
    const list = Array.from(files)

    return Promise.all(
        list.map(async (file) => {
            const src = URL.createObjectURL(file)
            const duration = await getDuration(src)

            return {
                id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                title: file.name.replace(/\.[^/.]+$/, ""),
                duration,
                src,
            } satisfies TrackType
        })
    )
}
