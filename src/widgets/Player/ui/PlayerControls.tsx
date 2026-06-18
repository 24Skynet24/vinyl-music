import { useAudioStore } from "../model/audioStore"
import PlayButton from "../../../shared/ui/Buttons/PlayButton"
import NextPrevButton from "../../../shared/ui/Buttons/NextPrevButton"
import RepeatButton from "../../../shared/ui/Buttons/RepeatButton"
import RandomButton from "../../../shared/ui/Buttons/RandomButton"

function PlayerControls() {
    const { 
        isPlaying, 
        isRepeat, 
        isRepeatOne,
        isRandom, 
        togglePlay, 
        toggleRepeat, 
        toggleRandom,
        prevTrack,
        nextTrack 
    } = useAudioStore()

    return (
        <article className="flex items-center gap-[20px]">
            <RandomButton isRandom={isRandom} onClick={toggleRandom} />
            
            <NextPrevButton isPrev onClick={prevTrack} />
            
            <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
            
            <NextPrevButton onClick={nextTrack} />
            
            <RepeatButton isRepeat={isRepeat} isRepeatOne={isRepeatOne} onClick={toggleRepeat} />
        </article>
    )
}

export default PlayerControls