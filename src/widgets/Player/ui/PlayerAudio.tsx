import { useEffect, useMemo, useRef } from "react"
import { useAudioStore } from "../model/audioStore"

function PlayerAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const currentTime = useAudioStore((state) => state.currentTime)
    const isPlaying = useAudioStore((state) => state.isPlaying)
    const isRepeatOne = useAudioStore((state) => state.isRepeatOne)
    const volume = useAudioStore((state) => state.volume)
    const isMuted = useAudioStore((state) => state.isMuted)
    const setCurrentTime = useAudioStore((state) => state.setCurrentTime)
    const setDuration = useAudioStore((state) => state.setDuration)
    const setIsPlaying = useAudioStore((state) => state.setIsPlaying)
    const nextTrack = useAudioStore((state) => state.nextTrack)

    const currentTrack = playList[currentIndex]
    const src = currentTrack?.src ?? ""

    const audioVolume = useMemo(() => isMuted ? 0 : volume, [isMuted, volume])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.volume = audioVolume
    }, [audioVolume])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        if (!src) {
            audio.removeAttribute("src")
            audio.load()
            setIsPlaying(false)
            setCurrentTime(0)
            return
        }

        audio.src = src
        audio.load()
        setCurrentTime(0)
        setDuration(currentTrack?.duration ?? 0)
    }, [currentTrack?.duration, setCurrentTime, setDuration, setIsPlaying, src])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !src) return

        if (Math.abs(audio.currentTime - currentTime) > 0.5) {
            audio.currentTime = currentTime
        }
    }, [currentTime, src])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !src) return

        if (isPlaying) {
            audio.play().catch(() => setIsPlaying(false))
            return
        }

        audio.pause()
    }, [isPlaying, setIsPlaying, src])

    const handleLoadedMetadata = () => {
        const audio = audioRef.current
        if (!audio) return

        setDuration(audio.duration || currentTrack?.duration || 0)
    }

    const handleEnded = () => {
        const audio = audioRef.current
        if (!audio) return

        if (isRepeatOne) {
            audio.currentTime = 0
            setCurrentTime(0)
            audio.play().catch(() => setIsPlaying(false))
            return
        }

        nextTrack()
    }

    return (
        <audio
            ref={audioRef}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={handleEnded}
        />
    )
}

export default PlayerAudio
