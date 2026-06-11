import PlayerControls from "./PlayerControls"
import PlayerDisk from "./PlayerDisk"
import PlayerInfoText from "./PlayerInfoText"
import PlayerTimeLine from "./PlayerTimeLine"
import PlayerVolume from "./PlayerVolume"

function Player () {
    return (
        <section className="max-h-[700px]">
            <div className="flex items-center gap-[64px] mb-[64px]">
                <PlayerDisk isPlaying={false}/>
                <div className="flex flex-col gap-[32px]">
                    <PlayerInfoText
                        musicName="Miki Matsubara Stay with me"
                        authorName="Miki Matsubara"
                        albumName="Miki Matsubara Best Collection"
                        year="1999"
                    />
                    <PlayerTimeLine duration={60} isPlaying={false}/>
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