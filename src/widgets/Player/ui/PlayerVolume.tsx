import { useEffect, useRef, useState } from "react";

function PlayerVolume() {
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const barRef = useRef<HTMLDivElement | null>(null);

    const currentVolume = isMuted ? 0 : volume;

    const getPercent = (clientX: number) => {
        if (!barRef.current) return 0;

        const rect = barRef.current.getBoundingClientRect();
        const x = clientX - rect.left;

        return Math.max(0, Math.min(1, x / rect.width));
    };

    const updateVolume = (clientX: number) => {
        const v = getPercent(clientX);
        setVolume(v);
        if (v > 0) setIsMuted(false);
    };

    // 🎯 start drag
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        updateVolume(e.clientX);
    };

    // 🎯 toggle mute
    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    // 🧠 global listeners for smooth drag
    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e: MouseEvent) => {
            updateVolume(e.clientX);
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

    const getIcon = () => {
        if (currentVolume === 0)
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 9.99997L20 14M20 9.99997L16 14M6 15H4C3.73478 15 3.48043 14.8946 3.29289 14.7071C3.10536 14.5195 3 14.2652 3 14V9.99997C3 9.73476 3.10536 9.4804 3.29289 9.29287C3.48043 9.10533 3.73478 8.99997 4 8.99997H6L9.5 4.49997C9.5874 4.3302 9.73265 4.1973 9.90949 4.12526C10.0863 4.05323 10.2831 4.04683 10.4643 4.10722C10.6454 4.1676 10.799 4.29078 10.8972 4.45451C10.9955 4.61824 11.0319 4.81171 11 4.99997V19C11.0319 19.1882 10.9955 19.3817 10.8972 19.5454C10.799 19.7092 10.6454 19.8323 10.4643 19.8927C10.2831 19.9531 10.0863 19.9467 9.90949 19.8747C9.73265 19.8027 9.5874 19.6697 9.5 19.5L6 15Z"
                        stroke="#FFFEE9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        if (currentVolume < 0.5)
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 9.00003C16.6491 9.86551 17 10.9182 17 12C17 13.0819 16.6491 14.1345 16 15M11 4.70203C10.9998 4.56274 10.9583 4.42663 10.8809 4.31088C10.8034 4.19514 10.6934 4.10493 10.5647 4.05166C10.436 3.99838 10.2944 3.98442 10.1577 4.01154C10.0211 4.03866 9.89559 4.10564 9.797 4.20403L6.413 7.58703C6.2824 7.7184 6.12703 7.82256 5.95589 7.89345C5.78475 7.96435 5.60124 8.00057 5.416 8.00003H3C2.73478 8.00003 2.48043 8.10539 2.29289 8.29292C2.10536 8.48046 2 8.73481 2 9.00003V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8947 2.73478 16 3 16H5.416C5.60124 15.9995 5.78475 16.0357 5.95589 16.1066C6.12703 16.1775 6.2824 16.2817 6.413 16.413L9.796 19.797C9.8946 19.8958 10.0203 19.9631 10.1572 19.9904C10.2941 20.0177 10.436 20.0037 10.5649 19.9503C10.6939 19.8968 10.804 19.8063 10.8815 19.6902C10.959 19.5741 11.0002 19.4376 11 19.298V4.70203Z"
                        stroke="#FFFEE9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 9.00003C16.6491 9.86551 17 10.9182 17 12C17 13.0819 16.6491 14.1345 16 15M19.364 18.364C20.1997 17.5283 20.8627 16.5361 21.315 15.4442C21.7673 14.3523 22.0001 13.1819 22.0001 12C22.0001 10.8181 21.7673 9.64779 21.315 8.55585C20.8627 7.46391 20.1997 6.47176 19.364 5.63603M11 4.70203C10.9998 4.56274 10.9583 4.42663 10.8809 4.31088C10.8034 4.19514 10.6934 4.10493 10.5647 4.05166C10.436 3.99838 10.2944 3.98442 10.1577 4.01154C10.0211 4.03866 9.89559 4.10564 9.797 4.20403L6.413 7.58703C6.2824 7.7184 6.12703 7.82256 5.95589 7.89345C5.78475 7.96435 5.60124 8.00057 5.416 8.00003H3C2.73478 8.00003 2.48043 8.10539 2.29289 8.29292C2.10536 8.48046 2 8.73481 2 9.00003V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8947 2.73478 16 3 16H5.416C5.60124 15.9995 5.78475 16.0357 5.95589 16.1066C6.12703 16.1775 6.2824 16.2817 6.413 16.413L9.796 19.797C9.8946 19.8958 10.0203 19.9631 10.1572 19.9904C10.2941 20.0177 10.436 20.0037 10.5649 19.9503C10.6939 19.8968 10.804 19.8063 10.8815 19.6902C10.959 19.5741 11.0002 19.4376 11 19.298V4.70203Z"
                    stroke="#FFFEE9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

    return (
        <article className="flex items-center w-[371px] gap-3">
            <div
                className="cursor-pointer w-[30px] flex justify-center"
                onClick={toggleMute}
            >
                {getIcon()}
            </div>

            <div
                ref={barRef}
                className="relative w-full h-[12px] bg-black-main cursor-pointer"
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute left-0 top-0 h-full bg-orange-main shadow-[2px_4px_10px_#d7452c]"
                    style={{ width: `${currentVolume * 100}%` }}
                />
            </div>
        </article>
    );
}

export default PlayerVolume;