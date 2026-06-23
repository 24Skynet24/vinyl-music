import { PlaylistInput, PlaylistType } from "../../entities/playlist"
import { TrackType } from "../../entities/track"

export interface LibraryResponse {
    tracks: TrackType[]
    playlists: PlaylistType[]
}

const ensureApi = () => {
    if (!window.vinylApi) {
        throw new Error("Vinyl API is not available")
    }

    return window.vinylApi
}

export const vinylApi = {
    loadLibrary: async (): Promise<LibraryResponse> =>
        ensureApi().loadLibrary() as Promise<LibraryResponse>,

    selectAudioFiles: async (): Promise<TrackType[]> =>
        ensureApi().selectAudioFiles() as Promise<TrackType[]>,

    importAudioFiles: async (filePaths: string[]): Promise<TrackType[]> =>
        ensureApi().importAudioFiles(filePaths) as Promise<TrackType[]>,

    getDroppedFilePath: (file: File): string =>
        ensureApi().getDroppedFilePath(file),

    saveTracks: async (tracks: TrackType[]): Promise<LibraryResponse> =>
        ensureApi().saveTracks(tracks) as Promise<LibraryResponse>,

    deleteTrack: async (trackId: string): Promise<LibraryResponse> =>
        ensureApi().deleteTrack(trackId) as Promise<LibraryResponse>,

    createPlaylist: async (data: PlaylistInput): Promise<LibraryResponse> =>
        ensureApi().createPlaylist(data) as Promise<LibraryResponse>,

    updatePlaylist: async (id: string, data: PlaylistInput): Promise<LibraryResponse> =>
        ensureApi().updatePlaylist(id, data) as Promise<LibraryResponse>,

    deletePlaylist: async (id: string): Promise<LibraryResponse> =>
        ensureApi().deletePlaylist(id) as Promise<LibraryResponse>,

    toggleTrackInPlaylist: async (playlistId: string, trackId: string): Promise<LibraryResponse> =>
        ensureApi().toggleTrackInPlaylist(playlistId, trackId) as Promise<LibraryResponse>,

    selectPlaylistCover: async (): Promise<string | null> =>
        ensureApi().selectPlaylistCover(),
}
