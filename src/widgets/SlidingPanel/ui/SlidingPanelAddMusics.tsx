import { useState } from "react"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import SelectAddMusic from "../../../shared/ui/Selects/SelectAddMusic"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { SlidingPanelAddMusicsProps } from "../model/types"
import { readAudioFiles } from "../lib/readAudioFiles"
import { TrackType } from "../../../entities/track"
import { useTranslation } from "react-i18next"

function SlidingPanelAddMusics({ onCancel, onSave }: SlidingPanelAddMusicsProps) {
    const { t } = useTranslation()
    const [newTracks, setNewTracks] = useState<TrackType[]>([])

    const handleFiles = async () => {
        const tracks = await readAudioFiles()
        if (tracks.length === 0) return

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
            <div
                className="flex items-center justify-center relative w-full h-[64px] pt-[8px] border-orange-main border-2 border-dashed cursor-pointer"
                onClick={handleFiles}
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
