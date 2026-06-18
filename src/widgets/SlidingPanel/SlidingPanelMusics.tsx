import { useAudioStore } from "../Player/model/audioStore"
import PlayListTrack from "../../shared/ui/Listes/PlayListTrack"
import { SlidingPanelMusicsProps } from "./model/types"

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
        </ul>
    )
}

export default SlidingPanelMusics