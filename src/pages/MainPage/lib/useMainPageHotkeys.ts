import { useEffect } from "react"
import { useAudioStore } from "../../../entities/audio"

const HOTKEY_SEEK_SECONDS = 5
const HOTKEY_VOLUME_STEP = 0.05

interface UseMainPageHotkeysParams {
  isEnabled: boolean
}

const isTextEditingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false

  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
}

export const useMainPageHotkeys = ({ isEnabled }: UseMainPageHotkeysParams) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !isEnabled ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isTextEditingTarget(event.target)
      ) {
        return
      }

      const {
        currentIndex,
        currentTime,
        duration,
        playList,
        setVolume,
        setCurrentTime,
        toggleMute,
        togglePlay,
        volume,
      } = useAudioStore.getState()
      const currentTrack = playList[currentIndex]

      if (event.code === "Space") {
        event.preventDefault()
        togglePlay()
        return
      }

      if (event.code === "KeyM") {
        event.preventDefault()
        toggleMute()
        return
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setVolume(Math.min(1, volume + HOTKEY_VOLUME_STEP))
        return
      }

      if (event.key === "ArrowDown") {
        event.preventDefault()
        setVolume(Math.max(0, volume - HOTKEY_VOLUME_STEP))
        return
      }

      if (!currentTrack) return

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setCurrentTime(Math.max(0, currentTime - HOTKEY_SEEK_SECONDS))
        return
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        setCurrentTime(duration > 0
          ? Math.min(duration, currentTime + HOTKEY_SEEK_SECONDS)
          : currentTime
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEnabled])
}
