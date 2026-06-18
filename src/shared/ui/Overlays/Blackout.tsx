import { BlackoutProps } from "./types"

function Blackout({ onClick, isClosing = false }: BlackoutProps) {
    return (
        <div
            className={`fixed left-0 top-0 w-screen h-screen bg-black-main/50 z-100 ${isClosing ? "fade-hide-panel" : "fade-show-panel"}`}
            onClick={onClick}
        />
    )
}

export default Blackout