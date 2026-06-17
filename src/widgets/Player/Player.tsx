import { useAudioStore } from "./model/audioStore"
import PlayerControls from "./PlayerControls"
import PlayerDisk from "./PlayerDisk"
import PlayerInfoText from "./PlayerInfoText"
import PlayerTimeLine from "./PlayerTimeLine"
import PlayerVolume from "./PlayerVolume"

function Player () {
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const currentTrack = playList[currentIndex]

    return (
        <section>
            <div className="flex items-center gap-[64px] mb-[64px]">
                <PlayerDisk />
                <div className="flex flex-col gap-[32px] min-w-[703px]">
                    {currentTrack && (
                        <PlayerInfoText
                            title={currentTrack.title}
                            artist={currentTrack.artist}
                            album={currentTrack.album}
                            year={currentTrack.year}
                        />
                    )}
                    <PlayerTimeLine />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div className="pl-[64px]">
                    <PlayerControls/>
                </div>
                <PlayerVolume/>
            </div>
        </section>
    )
}

export default Player