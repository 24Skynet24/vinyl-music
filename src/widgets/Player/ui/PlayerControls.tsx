import { useState } from "react"
import PlayButton from "../../../shared/ui/Buttons/PlayButton"
import NextPrevButton from "../../../shared/ui/Buttons/NextPrevButton"
import RepeatButton from "../../../shared/ui/Buttons/RepeatButton"
import RandomButton from "../../../shared/ui/Buttons/RandomButton"

function PlayerControls() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    return (
        <article className="flex items-center gap-[20px]">
            <NextPrevButton isPrev onClick={() => {}} />
            <PlayButton
                isPlaying={isPlaying}
                onClick={() => setIsPlaying((prev) => !prev)}
            />
            <NextPrevButton onClick={() => {}} />
            <RepeatButton
                isRepeat={isRepeat}
                onClick={() => setIsRepeat((prev) => !prev)}
            />
            <RandomButton
                isRandom={isRandom}
                onClick={() => setIsRandom((prev) => !prev)}
            />
        </article>
    )
}

export default PlayerControls