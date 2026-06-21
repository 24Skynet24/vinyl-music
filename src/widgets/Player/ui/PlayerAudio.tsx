import { useEffect, useMemo, useRef } from "react"
import { vinylApi } from "../../../shared/api/vinylApi"
import { useAudioStore } from "../../../entities/audio"
import { useEqualizerAudioGraph } from "../lib/useEqualizerAudioGraph"

function PlayerAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const currentTime = useAudioStore((state) => state.currentTime)
    const isPlaying = useAudioStore((state) => state.isPlaying)
    const isRepeatOne = useAudioStore((state) => state.isRepeatOne)
    const volume = useAudioStore((state) => state.volume)
    const isMuted = useAudioStore((state) => state.isMuted)
    const equalizerValues = useAudioStore((state) => state.equalizerValues)
    const setCurrentTime = useAudioStore((state) => state.setCurrentTime)
    const setDuration = useAudioStore((state) => state.setDuration)
    const setIsPlaying = useAudioStore((state) => state.setIsPlaying)
    const updateTrackDuration = useAudioStore((state) => state.updateTrackDuration)
    const nextTrack = useAudioStore((state) => state.nextTrack)

    const currentTrack = playList[currentIndex]
    const src = currentTrack?.src ?? ""

    const audioVolume = useMemo(() => isMuted ? 0 : volume, [isMuted, volume])
    const resumeEqualizerGraph = useEqualizerAudioGraph(audioRef, equalizerValues)

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
            resumeEqualizerGraph()
            audio.play().catch(() => setIsPlaying(false))
            return
        }

        audio.pause()
    }, [isPlaying, resumeEqualizerGraph, setIsPlaying, src])

    const handleDurationUpdate = () => {
        const audio = audioRef.current
        if (!audio || !currentTrack) return

        const nextDuration = Math.floor(audio.duration)
        if (!Number.isFinite(nextDuration) || nextDuration <= 0) return

        const duration = nextDuration
        setDuration(duration)

        if (duration > 0 && duration !== currentTrack.duration) {
            const updatedTrack = { ...currentTrack, duration }
            updateTrackDuration(currentTrack.id, duration)
            vinylApi.saveTracks([updatedTrack]).catch((error) => {
                console.error("Failed to persist track duration", error)
            })
        }
    }

    const handleTimeUpdate = (event: React.SyntheticEvent<HTMLAudioElement>) => {
        handleDurationUpdate()

        const audio = event.currentTarget
        const duration = Number.isFinite(audio.duration) && audio.duration > 0
            ? audio.duration
            : currentTrack?.duration ?? 0
        const time = duration > 0 ? Math.min(audio.currentTime, duration) : audio.currentTime

        setCurrentTime(time)
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
            onLoadedMetadata={handleDurationUpdate}
            onDurationChange={handleDurationUpdate}
            onCanPlay={handleDurationUpdate}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
        />
    )
}

export default PlayerAudio
