import { useAudioStore } from "../../Player/model/audioStore"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import { SlidingPanelMusicsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"

function SlidingPanelMusics({ onEditTrack }: SlidingPanelMusicsProps) {
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const selectTrack = useAudioStore((state) => state.selectTrack)

    return (
        <ul className="flex flex-col gap-[32px]">
            {playList.map((track, index) => (
                <li key={`musics-${index}`}>
                    <PlayListTrack
                        id={track.id}
                        title={track.title}
                        duration={track.duration}
                        isSelected={index === currentIndex}
                        artist={track.artist}
                        album={track.album}
                        img={track.img}
                        onClick={() => selectTrack(index)}
                        editPlaylist={onEditTrack}
                    />
                </li>
            ))}
            <li className="flex justify-center mt-[32px]">
                <TextButton text="Show more" onClick={() => {}} minWidth={180} />
            </li>
        </ul>
    )
}

export default SlidingPanelMusics