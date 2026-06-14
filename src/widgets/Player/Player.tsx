import PlayerControls from "./PlayerControls"
import PlayerDisk from "./PlayerDisk"
import PlayerInfoText from "./PlayerInfoText"
import PlayerPlayList from "./PlayerPlayList"
import PlayerTimeLine from "./PlayerTimeLine"
import PlayerVolume from "./PlayerVolume"

function Player () {
    return (
        <section>
            <div className="flex items-center gap-[64px] mb-[64px]">
                <PlayerDisk />
                <div className="flex flex-col gap-[32px]">
                    <PlayerInfoText
                        title="Miki Matsubara Stay with me"
                        authorName="Miki Matsubara"
                        albumName="Miki Matsubara Best Collection"
                        year="1999"
                    />
                    <PlayerTimeLine />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div className="pl-[64px]">
                    <PlayerControls/>
                </div>
                <PlayerVolume/>
            </div>
            <div className="mt-[124px]">
                <PlayerPlayList/>
            </div>
        </section>
    )
}

export default Player