import { PlaylistType, ALL_MUSIC_ID } from "../../../entities/playlist"
import { TrackType } from "../../../entities/track"
import { MusicSortType, PlaylistSortType } from "../model/types"

export interface IndexedTrack {
    track: TrackType
    index: number
}

interface GetFilteredTracksParams {
    tracks: TrackType[]
    playlist?: PlaylistType
    searchQuery: string
    sortType: MusicSortType
}

interface GetFilteredPlaylistsParams {
    playlists: PlaylistType[]
    allMusicCount: number
    searchQuery: string
    sortType: PlaylistSortType
}

const MIN_SEARCH_LENGTH = 3

const getComparableText = (value?: string | number) =>
    String(value ?? "").toLowerCase()

const shouldSearch = (searchQuery: string) =>
    searchQuery.trim().length >= MIN_SEARCH_LENGTH

const includesSearch = (value: string | number | undefined, searchQuery: string) =>
    getComparableText(value).includes(searchQuery.trim().toLowerCase())

const getTrackCount = (playlist: PlaylistType, allMusicCount: number) =>
    playlist.id === ALL_MUSIC_ID ? allMusicCount : playlist.trackIds.length

export const getFilteredSortedTracks = ({
    tracks,
    playlist,
    searchQuery,
    sortType,
}: GetFilteredTracksParams): IndexedTrack[] => {
    const normalizedSearch = searchQuery.trim().toLowerCase()
    const isSearchActive = shouldSearch(searchQuery)

    return tracks
        .map((track, index) => ({ track, index }))
        .filter(({ track }) => {
            if (!playlist || playlist.id === ALL_MUSIC_ID) return true

            return playlist.trackIds.includes(track.id)
        })
        .filter(({ track }) => {
            if (!isSearchActive) return true

            return [
                track.title,
                track.year,
                track.album,
                track.artist,
            ].some((value) => includesSearch(value, normalizedSearch))
        })
        .sort((first, second) => {
            if (sortType === "duration") {
                return first.track.duration - second.track.duration
            }

            const firstValue = getComparableText(first.track[sortType])
            const secondValue = getComparableText(second.track[sortType])

            return firstValue.localeCompare(secondValue)
        })
}

export const getFilteredSortedPlaylists = ({
    playlists,
    allMusicCount,
    searchQuery,
    sortType,
}: GetFilteredPlaylistsParams): PlaylistType[] => {
    const normalizedSearch = searchQuery.trim().toLowerCase()
    const isSearchActive = shouldSearch(searchQuery)
    const filteredPlaylists = playlists.filter((playlist) =>
        !isSearchActive || includesSearch(playlist.title, normalizedSearch)
    )
    const allMusic = filteredPlaylists.find((playlist) => playlist.id === ALL_MUSIC_ID)
    const rest = filteredPlaylists.filter((playlist) => playlist.id !== ALL_MUSIC_ID)

    const sorted = [...rest].sort((first, second) => {
        if (sortType === "tracksCount") {
            return getTrackCount(second, allMusicCount) - getTrackCount(first, allMusicCount)
        }

        return getComparableText(second.title).localeCompare(getComparableText(first.title))
    })

    return allMusic ? [allMusic, ...sorted] : sorted
}
