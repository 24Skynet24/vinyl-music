import { useEffect, useRef, useState } from "react";
import { PlayerTimeLineType } from "../types";

function PlayerTimeLine({ duration }: PlayerTimeLineType) {
    const [progress, setProgress] = useState(0);
    const [hoverProgress, setHoverProgress] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const barRef = useRef<HTMLDivElement | null>(null);

    const getPercent = (clientX: number): number => {
        if (!barRef.current) return 0;

        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left;

        return Math.max(0, Math.min(1, x / rect.width));
    };

    const updateProgress = (clientX: number): void => {
        setProgress(getPercent(clientX));
    };

    // 🖱 start drag
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
        setIsDragging(true);
        updateProgress(e.clientX);
    };

    // 🖱 click
    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        updateProgress(e.clientX);
    };

    // 🧠 global drag
    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e: MouseEvent) => {
            updateProgress(e.clientX);
        };

        const onUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [isDragging]);

    // hover (disabled during drag)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (isDragging) return;
        setHoverProgress(getPercent(e.clientX));
    };

    const handleMouseLeave = (): void => {
        if (isDragging) return;
        setHoverProgress(null);
    };

    // 🎯 active (important fix)
    const activeProgress = isDragging
        ? progress
        : hoverProgress;

    const activeTime =
        activeProgress !== null ? activeProgress * duration : null;

    const formatTime = (sec: number): string => {
        if (!isFinite(sec)) return "00:00";

        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <article className="flex flex-col gap-[12px] w-[703px]">
            <div className="flex items-center justify-between w-full text-[32px] tracking-[1px] select-none">
                <span className="text-orange-main">00:00</span>
                <span className="text-white-main">{formatTime(duration)}</span>
            </div>

            <div
                ref={barRef}
                className="w-full h-[12px] relative bg-black-main cursor-pointer shadow-[2px_4px_10px_#fffee9]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/* 🟠 progress */}
                <span
                    className="absolute z-10 h-full bg-orange-main left-0 top-0 shadow-[2px_4px_10px_#d7452c]"
                    style={{ width: `${progress * 100}%` }}
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
                        className="absolute bottom-[18px] -translate-x-1/2 text-[12px] text-white-main bg-black-main px-2 py-1 rounded select-none"
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