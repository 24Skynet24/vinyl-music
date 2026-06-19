import { useState } from "react"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import SelectAddMusic from "../../../shared/ui/Selects/SelectAddMusic"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { SlidingPanelAddMusicsProps } from "../model/types"
import { readAudioFiles } from "../lib/readAudioFiles"
import { TrackType } from "../../../entities/track"

function SlidingPanelAddMusics({ onCancel, onSave }: SlidingPanelAddMusicsProps) {
    const [newTracks, setNewTracks] = useState<TrackType[]>([])

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return

        const tracks = await readAudioFiles(files)
        // New music appears at the start of the list.
        setNewTracks((prev) => [...tracks, ...prev])
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
        return <SelectAddMusic onSelect={handleFiles} />
    }

    return (
        <div className="flex flex-col gap-[32px]">
            <div className="flex items-center justify-center relative w-full h-[64px] pt-[8px] border-orange-main border-2 border-dashed cursor-pointer">
                <span className="text-[36px] text-orange-main uppercase text-center select-none">
                    add new music
                </span>
                <input
                    type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept="audio/*"
                    multiple
                    onChange={(event) => {
                        handleFiles(event.target.files)
                        event.target.value = ""
                    }}
                />
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
                <TextButton onClick={handleCancel} text="cancel"/>
                <TextButton onClick={handleSave} text="Save"/>
            </div>
        </div>
    )
}

export default SlidingPanelAddMusics
