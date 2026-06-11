import { create } from 'zustand'
import { AudioState } from './types'

let timerInterval: NodeJS.Timeout | null = null

export const useAudioStore = create<AudioState>((set, get) => ({
    // Statuses
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isRepeatOne: false,

    // Time
    currentTime: 0,
    duration: 180, 

    togglePlay: () => {
        const { isPlaying } = get()
        const nextState = !isPlaying

        if (nextState) {
            timerInterval = setInterval(() => {
                get().tickProgress()
            }, 1000)
        } else {
            if (timerInterval) clearInterval(timerInterval)
        }

        set({ isPlaying: nextState })
    },

    tickProgress: () => {
        const { currentTime, duration, isRepeatOne, isRepeat } = get()
        
        if (currentTime >= duration) {
            if (isRepeatOne) {
                set({ currentTime: 0 })
            } else if (isRepeat) {
                // ToDo: next music in playlist
                set({ currentTime: 0 })
            } else {
                // if no more musick in playlist - stop
                if (timerInterval) clearInterval(timerInterval)
                set({ isPlaying: false, currentTime: 0 })
            }
        } 
        else {
            set({ currentTime: currentTime + 1 })
        }
    },

    prevTrack: () => {
        const { currentTime } = get()

        // To start music if current time less then 5 sec.
        if (currentTime > 5) set({ currentTime: 0 })
        else {
            console.log('Prev track')
            // ToDo: prev track
            set({ currentTime: 0 })
        }
    },

    nextTrack: () => {
        console.log('Next track')
        set({ currentTime: 0 })
    },

    setCurrentTime: (time) => set({ currentTime: time }),
    toggleRandom: () => set((state) => ({ isRandom: !state.isRandom })),
    
    // on -> repeat playlist -> repeat track -> off
    toggleRepeat: () => {
        const { isRepeat, isRepeatOne } = get()
        if (!isRepeat && !isRepeatOne) set({ isRepeat: true, isRepeatOne: false })
        else if (isRepeat && !isRepeatOne) set({ isRepeat: false, isRepeatOne: true })
        else set({ isRepeat: false, isRepeatOne: false })
    },
}))