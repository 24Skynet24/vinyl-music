import { MusicSortType, PlaylistSortType } from "./types"

export const MUSICS_PER_PAGE = 20
export const PLAYLISTS_PER_PAGE = 10

export const MUSIC_SEARCH_PLACEHOLDER = "Search by title, year, album or artist..."
export const PLAYLIST_SEARCH_PLACEHOLDER = "Search by playlist name..."

export const musicSortOptions: { value: MusicSortType, label: string }[] = [
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist" },
    { value: "album", label: "Album" },
    { value: "duration", label: "Duration" },
]

export const playlistSortOptions: { value: PlaylistSortType, label: string }[] = [
    { value: "title", label: "Title" },
    { value: "tracksCount", label: "Tracks" },
]
