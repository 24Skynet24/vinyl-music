import { MusicSortType, PlaylistSortType } from "./types"

export const MUSICS_PER_PAGE = 20
export const PLAYLISTS_PER_PAGE = 10

export const MUSIC_SEARCH_PLACEHOLDER = "Search by title, year, album or artist..."
export const PLAYLIST_SEARCH_PLACEHOLDER = "Search by playlist name..."

export const musicSortOptions: { value: MusicSortType, label: string }[] = [
    { value: "title", label: "sort.title" },
    { value: "artist", label: "sort.artist" },
    { value: "album", label: "sort.album" },
    { value: "duration", label: "sort.duration" },
    { value: "dateAdded", label: "sort.dateAdded" },
]

export const playlistSortOptions: { value: PlaylistSortType, label: string }[] = [
    { value: "title", label: "sort.title" },
    { value: "tracksCount", label: "sort.tracksCount" },
]
