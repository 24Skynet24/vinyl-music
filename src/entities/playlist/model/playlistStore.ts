import { create } from "zustand"
import { PlaylistType, PlaylistState } from "./types"

export const ALL_MUSIC_ID = "all-music"

// "All music" is a hardcoded playlist that can't be edited or removed.
const allMusicPlaylist: PlaylistType = {
    id: ALL_MUSIC_ID,
    title: "All music",
    description: "All your music",
    isLocked: true,
    trackIds: [],
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
    playlists: [allMusicPlaylist],

    setPlaylists: (playlists) => set({ playlists }),

    addPlaylist: ({ title, description, img }) =>
        set((state) => ({
            playlists: [
                ...state.playlists,
                {
                    id: crypto.randomUUID(),
                    title,
                    description,
                    img,
                    trackIds: [],
                },
            ],
        })),

    updatePlaylist: (id, { title, description, img }) =>
        set((state) => ({
            playlists: state.playlists.map((playlist) =>
                playlist.id === id && !playlist.isLocked
                    ? { ...playlist, title, description, img }
                    : playlist
            ),
        })),

    deletePlaylist: (id) =>
        set((state) => ({
            playlists: state.playlists.filter(
                (playlist) => playlist.id !== id || playlist.isLocked
            ),
        })),

    toggleTrackInPlaylist: (playlistId, trackId) =>
        set((state) => ({
            playlists: state.playlists.map((playlist) => {
                if (playlist.id !== playlistId || playlist.isLocked) return playlist

                const hasTrack = playlist.trackIds.includes(trackId)
                return {
                    ...playlist,
                    trackIds: hasTrack
                        ? playlist.trackIds.filter((id) => id !== trackId)
                        : [...playlist.trackIds, trackId],
                }
            }),
        })),
}))
