import { useRef, useState } from "react"
import { useAudioStore } from "./model/audioStore"
import { formatTime } from "../../shared/lib"

function PlayerTimeLine() {
    const barRef = useRef<HTMLDivElement | null>(null)
    
    const currentTime = useAudioStore((state) => state.currentTime)
    const duration = useAudioStore((state) => state.duration)
    const setCurrentTime = useAudioStore((state) => state.setCurrentTime)

    const [hoverProgress, setHoverProgress] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const currentProgress = currentTime / duration

    const getPercent = (clientX: number) => {
        if (!barRef.current) return 0
        const rect = barRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        return Math.max(0, Math.min(1, x / rect.width))
    }

    const updateFromClientX = (clientX: number) => {
        const percent = getPercent(clientX)
        setCurrentTime(percent * duration)
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true)
        setHoverProgress(null)
        updateFromClientX(e.clientX)
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return
        updateFromClientX(e.clientX)
    }

    const handlePointerUp = () => {
        setIsDragging(false)
        setHoverProgress(null)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) return
        setHoverProgress(getPercent(e.clientX))
    }

    const handleMouseLeave = () => {
        if (isDragging) return
        setHoverProgress(null)
    }

    const activeProgress = isDragging ? currentProgress : hoverProgress
    const activeTime = activeProgress !== null ? activeProgress * duration : null

    return (
        <article className="flex flex-col gap-[12px] w-full">
            <div className="flex items-center justify-between w-full text-[32px] tracking-[1px] select-none">
                <span className="text-orange-main">{formatTime(currentTime)}</span>
                <span className="text-white-main">{formatTime(duration)}</span>
            </div>

            <div
                ref={barRef}
                className="w-full h-[12px] relative bg-black-main cursor-pointer shadow-[2px_4px_10px_#fffee9]"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <span
                    className="absolute z-10 h-full bg-orange-main left-0 top-0 shadow-[2px_4px_10px_#d7452c]"
                    style={{ width: `${currentProgress * 100}%` }}
                />

                <span
                    className="absolute z-0 h-full bg-gray-main left-0 top-0"
                    style={{
                        width: `${(activeProgress ?? 0) * 100}%`,
                        opacity: activeProgress !== null ? 1 : 0,
                    }}
                />

                {activeProgress !== null && (
                    <div
                        className="absolute bottom-[18px] -translate-x-1/2 text-[12px] text-white-main bg-black-main px-2 py-1 rounded"
                        style={{ left: `${activeProgress * 100}%` }}
                    >
                        {formatTime(activeTime!)}
                    </div>
                )}
            </div>
        </article>
    )
}

export default PlayerTimeLine