import { useAudioStore } from "./model/audioStore"
import PlayListItem from "../../shared/ui/Listes/PlayListItem"

function PlayerPlayList () {
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const selectTrack = useAudioStore((state) => state.selectTrack)

    return (
        <section>
            <ul className="flex flex-col gap-[32px]">
                {playList.map((track, index) => (
                    <PlayListItem
                        key={track.id}
                        id={track.id}
                        title={track.title}
                        duration={track.duration}
                        isSelected={index === currentIndex}
                        artist={track.artist}
                        album={track.album}
                        img={track.img}
                        onClick={() => selectTrack(index)}
                    />
                ))}
            </ul>
        </section>
    )
}

export default PlayerPlayList