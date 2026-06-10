import { useState } from "react";
import { PlayerTimeLineType } from "../types";

function PlayerTimeLine({ duration, isPlaying }: PlayerTimeLineType) {
    const [progress, setProgress] = useState(0);
    const [hoverProgress, setHoverProgress] = useState<number | null>(null);

    const getPercent = (e: React.MouseEvent<HTMLDivElement>): number => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        return Math.max(0, Math.min(1, x / rect.width));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        setHoverProgress(getPercent(e));
    };

    const handleMouseLeave = (): void => {
        setHoverProgress(null);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        setProgress(getPercent(e));
    };

    const formatTime = (sec: number): string => {
        if (!isFinite(sec)) return "00:00";

        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const hoverTime: number | null = hoverProgress !== null ? hoverProgress * duration : null;

    return (
        <article className="flex flex-col gap-[12px] w-[703px]">
            <div className="flex items-center justify-between w-full text-[32px] tracking-[1px] select-none">
                <span className="text-orange-main cursor-default">00:00</span>
                <span className="text-white-main cursor-default">{formatTime(duration)}</span>
            </div>

            <div
                className="w-full h-[12px] relative bg-black-main cursor-pointer shadow-[2px_4px_10px_#fffee9]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <span
                    className="absolute z-10 h-full bg-orange-main left-0 top-0 shadow-[2px_4px_10px_#d7452c]"
                    style={{ width: `${progress * 100}%` }}
                />

                <span
                    className="absolute z-0 h-full bg-gray-main left-0 top-0"
                    style={{
                        width: `${(hoverProgress ?? 0) * 100}%`,
                        opacity: hoverProgress !== null ? 1 : 0,
                    }}
                />

                {hoverProgress !== null && (
                    <div
                        className="absolute bottom-[18px] -translate-x-1/2 text-[12px] text-white-main bg-black-main px-2 py-1 rounded"
                        style={{
                            left: `${hoverProgress * 100}%`,
                        }}
                    >
                        {formatTime(hoverTime!)}
                    </div>
                )}
            </div>
        </article>
    );
}

export default PlayerTimeLine;