import { useState } from "react"
import type { DragEvent } from "react"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import SelectAddMusic from "../../../shared/ui/Selects/SelectAddMusic"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { SlidingPanelAddMusicsProps } from "../model/types"
import { readAudioFiles } from "../lib/readAudioFiles"
import { TrackType } from "../../../entities/track"
import { useTranslation } from "react-i18next"
import { vinylApi } from "../../../shared/api/vinylApi"

function SlidingPanelAddMusics({ onCancel, onSave }: SlidingPanelAddMusicsProps) {
    const { t } = useTranslation()
    const [newTracks, setNewTracks] = useState<TrackType[]>([])

    const getFilePath = (file: File) => vinylApi.getDroppedFilePath(file)

    const getFileEntryPaths = (entry: FileSystemFileEntry) =>
        new Promise<string[]>((resolve) => {
            entry.file(
                (file) => {
                    const filePath = getFilePath(file)

                    resolve(filePath ? [filePath] : [])
                },
                () => resolve([])
            )
        })

    const getDirectoryEntryPaths = async (entry: FileSystemDirectoryEntry) => {
        const reader = entry.createReader()
        const filePaths: string[] = []
        let hasMoreEntries = true

        while (hasMoreEntries) {
            const entries = await new Promise<FileSystemEntry[]>((resolve) => {
                reader.readEntries(resolve, () => resolve([]))
            })

            hasMoreEntries = entries.length > 0
            if (!hasMoreEntries) continue

            const nestedPaths = await Promise.all(entries.map(getEntryPaths))
            filePaths.push(...nestedPaths.flat())
        }

        return filePaths
    }

    const getEntryPaths = (entry: FileSystemEntry): Promise<string[]> => {
        if (entry.isFile) {
            return getFileEntryPaths(entry as FileSystemFileEntry)
        }

        if (entry.isDirectory) {
            return getDirectoryEntryPaths(entry as FileSystemDirectoryEntry)
        }

        return Promise.resolve([])
    }

    const getDroppedFilePaths = async (dataTransfer: DataTransfer) => {
        const entries = Array.from(dataTransfer.items)
            .map((item) => item.webkitGetAsEntry())
            .filter((entry): entry is FileSystemEntry => Boolean(entry))

        const paths = entries.length
            ? (await Promise.all(entries.map(getEntryPaths))).flat()
            : Array.from(dataTransfer.files).map(getFilePath)

        return Array.from(new Set(paths.filter((filePath) => filePath.length > 0)))
    }

    const handleFiles = async (filePaths?: string[]) => {
        const tracks = await readAudioFiles(filePaths)
        if (tracks.length === 0) return

        // New music appears at the start of the list.
        setNewTracks((prev) => [...tracks, ...prev])
    }

    const handleDragOver = (event: DragEvent<HTMLElement>) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "copy"
    }

    const handleDrop = async (event: DragEvent<HTMLElement>) => {
        event.preventDefault()
        event.stopPropagation()

        const filePaths = await getDroppedFilePaths(event.dataTransfer)
        if (!filePaths.length) return

        await handleFiles(filePaths)
    }

    const handleRemove = (id: string) => {
        setNewTracks((prev) => prev.filter((track) => track.id !== id))
    }

    const handleCancel = () => {
        setNewTracks([])
        onCancel()
    }

    const handleSave = () => {
        onSave(newTracks)
        setNewTracks([])
    }

    if (newTracks.length === 0) {
        return <SelectAddMusic onSelect={() => handleFiles()} onDrop={handleDrop} onDragOver={handleDragOver} />
    }

    return (
        <div className="flex flex-col gap-[32px]">
            <div
                className="flex items-center justify-center relative w-full h-[64px] pt-[8px] border-orange-main border-2 border-dashed cursor-pointer"
                onClick={() => handleFiles()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <span className="text-[36px] text-orange-main uppercase text-center select-none">
                    {t("music.addNew")}
                </span>
            </div>

            <ul className="flex flex-col gap-[32px] max-h-[71vh] overflow-y-auto pb-[16px]">
                {newTracks.map((track) => (
                    <li key={track.id}>
                        <PlayListTrack
                            isNewTrack={true}
                            id={track.id}
                            title={track.title}
                            duration={track.duration}
                            artist={track.artist}
                            album={track.album}
                            img={track.img}
                            removeNewTrack={() => handleRemove(track.id)}
                        />
                    </li>
                ))}
            </ul>

            <div className="ml-auto flex items-center gap-[16px]">
                <TextButton onClick={handleCancel} text={t("actions.cancel")}/>
                <TextButton onClick={handleSave} text={t("actions.save")}/>
            </div>
        </div>
    )
}

export default SlidingPanelAddMusics
