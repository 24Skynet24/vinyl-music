import PlayerControls from "./PlayerControls"
import PlayerDisk from "./PlayerDisk"
import PlayerInfoText from "./PlayerInfoText"
import PlayerTimeLine from "./PlayerTimeLine"
import PlayerVolume from "./PlayerVolume"

function Player () {
    return (
        <section>
            <div className="flex items-center gap-[64px]">
                <PlayerDisk isPlaying/>
                <div className="flex flex-col gap-[32px]">
                    <PlayerInfoText
                        musicName="Miki Matsubara Stay with me"
                        authorName="Miki Matsubara"
                        albumName="Miki Matsubara Best Collection"
                        year="1999"
                    />
                    <PlayerTimeLine duration={60} isPlaying/>
                    <PlayerVolume/>
                </div>
            </div>
            <PlayerControls/>
        </section>
    )
}

export default Player