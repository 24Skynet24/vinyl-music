export interface DefaultButtonType {
    onClick: () => void
}

export interface ControlButtonType extends DefaultButtonType {
    control: "prev" | "next" | "repeat" | "repeat-one" | "random"
}

export interface PlayButtonProps extends DefaultButtonType {
    isPlaying: boolean
}

export interface NextPrevButtonProps extends DefaultButtonType {
    isPrev?: boolean
}

export interface RepeatButtonProps extends DefaultButtonType {
    isRepeat: boolean
}

export interface RandomButtonProps extends DefaultButtonType {
    isRandom: boolean
}
