export const getAudioDuration = (url: string): Promise<number> =>
    new Promise((resolve) => {
        const audio = document.createElement("audio")
        let isResolved = false
        let timeoutId: number | null = null

        const getValidDuration = () => {
            const duration = Math.floor(audio.duration)

            return Number.isFinite(duration) && duration > 0 ? duration : null
        }

        const cleanup = () => {
            if (timeoutId) window.clearTimeout(timeoutId)
            audio.onloadedmetadata = null
            audio.ondurationchange = null
            audio.oncanplay = null
            audio.ontimeupdate = null
            audio.onerror = null
            audio.removeAttribute("src")
            audio.load()
        }

        const resolveDuration = (duration: number) => {
            if (isResolved) return

            isResolved = true
            cleanup()
            resolve(duration)
        }

        const tryResolveDuration = () => {
            const duration = getValidDuration()
            if (duration) {
                resolveDuration(duration)
            }
        }

        audio.preload = "metadata"
        audio.onloadedmetadata = () => {
            tryResolveDuration()

            if (audio.duration === Infinity) {
                audio.currentTime = Number.MAX_SAFE_INTEGER
            }
        }
        audio.ondurationchange = tryResolveDuration
        audio.oncanplay = tryResolveDuration
        audio.ontimeupdate = tryResolveDuration
        audio.onerror = () => resolveDuration(0)
        timeoutId = window.setTimeout(() => resolveDuration(0), 6000)
        audio.src = url
        audio.load()
    })
