import { useRef, useState } from "react";
import { PlayerTimeLineType } from "../types";

function PlayerTimeLine({ duration }: PlayerTimeLineType) {
    const barRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [hoverProgress, setHoverProgress] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // 📐 convert pointer position → percent
    const getPercent = (clientX: number) => {
        if (!barRef.current) return 0;

        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left;

        return Math.max(0, Math.min(1, x / rect.width));
    };

    const formatTime = (sec: number) => {
        if (!isFinite(sec)) return "00:00";

        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    // 🎯 unified update
    const updateFromClientX = (clientX: number) => {
        const v = getPercent(clientX);
        setProgress(v);
    };

    // 🟠 drag start
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setHoverProgress(null);
        updateFromClientX(e.clientX);

        // 💡 captures pointer outside element (important fix)
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    // 🧠 drag move (works even outside bar)
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        updateFromClientX(e.clientX);
    };

    // 🧹 drag end
    const handlePointerUp = () => {
        setIsDragging(false);
        setHoverProgress(null);
    };

    // 👀 hover (disabled during drag)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) return;
        setHoverProgress(getPercent(e.clientX));
    };

    const handleMouseLeave = () => {
        if (isDragging) return;
        setHoverProgress(null);
    };

    // 🎯 active UI source of truth
    const activeProgress = isDragging ? progress : hoverProgress;

    const activeTime =
        activeProgress !== null ? activeProgress * duration : null;

    return (
        <article className="flex flex-col gap-[12px] w-[703px]">
            {/* TIME */}
            <div className="flex items-center justify-between w-full text-[32px] tracking-[1px] select-none">
                <span className="text-orange-main">00:00</span>
                <span className="text-white-main">
                    {formatTime(duration)}
                </span>
            </div>

            {/* BAR */}
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
                {/* 🟠 progress */}
                <span
                    className="absolute z-10 h-full bg-orange-main left-0 top-0 shadow-[2px_4px_10px_#d7452c]"
                    style={{ width: `${progress * 100}%` }}
                />

                {/* ⚫ hover preview */}
                <span
                    className="absolute z-0 h-full bg-gray-main left-0 top-0"
                    style={{
                        width: `${(activeProgress ?? 0) * 100}%`,
                        opacity: activeProgress !== null ? 1 : 0,
                    }}
                />

                {/* ⏱ tooltip */}
                {activeProgress !== null && (
                    <div
                        className="absolute bottom-[18px] -translate-x-1/2 text-[12px] text-white-main bg-black-main px-2 py-1 rounded"
                        style={{
                            left: `${activeProgress * 100}%`,
                        }}
                    >
                        {formatTime(activeTime!)}
                    </div>
                )}
            </div>
        </article>
    );
}

export default PlayerTimeLine;