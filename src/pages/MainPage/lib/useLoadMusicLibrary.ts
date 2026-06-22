import { useEffect } from "react"
import { useAudioStore } from "../../../entities/audio"
import { usePlaylistStore } from "../../../entities/playlist"
import { vinylApi } from "../../../shared/api/vinylApi"
import { getAudioDuration } from "../../../shared/lib"

export const useLoadMusicLibrary = () => {
  const setTracks = useAudioStore((state) => state.setTracks)
  const updateTrackDuration = useAudioStore((state) => state.updateTrackDuration)
  const setPlaylists = usePlaylistStore((state) => state.setPlaylists)

  useEffect(() => {
    vinylApi.loadLibrary()
      .then(({ tracks, playlists }) => {
        setTracks(tracks)
        setPlaylists(playlists)

        const tracksWithoutDuration = tracks.filter((track) => track.src && track.duration <= 0)
        if (!tracksWithoutDuration.length) return

        Promise.all(
          tracksWithoutDuration.map(async (track) => {
            const duration = track.src ? await getAudioDuration(track.src) : 0

            return duration > 0 ? { ...track, duration } : null
          })
        )
          .then((updatedTracks) => {
            const validTracks = updatedTracks.filter((track) => track !== null)
            if (!validTracks.length) return

            validTracks.forEach((track) => updateTrackDuration(track.id, track.duration))
            vinylApi.saveTracks(validTracks).catch((error) => {
              console.error("Failed to persist restored durations", error)
            })
          })
          .catch((error) => {
            console.error("Failed to restore track durations", error)
          })
      })
      .catch((error) => {
        console.error("Failed to load music library", error)
      })
  }, [setPlaylists, setTracks, updateTrackDuration])
}
