// 185s = 03:05
export const formatTime = (sec: number): string => {
    if (!isFinite(sec)) return "00:00"
    const m: number = Math.floor(sec / 60)
    const s: number = Math.floor(sec % 60)
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}