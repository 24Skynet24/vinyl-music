import { useEffect } from "react"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { usePlaylistStore } from "../../../entities/playlist"
import { NavigationSidebar } from "../../../widgets/NavigationSidebar"
import { Player } from "../../../widgets/Player"
import { useAudioStore } from "../../../entities/audio"
import { SlidingPanel } from "../../../widgets/SlidingPanel"
import EditPlayList from "../../../features/EditPlaylist/ui/EditPlayList"
import EditTrack from "../../../features/EditTrack/ui/EditTrack"
import Blackout from "../../../shared/ui/Overlays/Blackout"
import { vinylApi } from "../../../shared/api/vinylApi"
import { getAudioDuration } from "../../../shared/lib"
import { Footer } from "../../../widgets/Footer"
import { MODAL_VIEWS } from "../../../features/Navigation/model/views"

export function MainPage() {
  const { panelView, modalView, isPanelClosing, editTrackId, editPlaylistId, closePanel, closeModal } = useNavigationStore()
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

  return (
    <main className="w-full pb-[16px] h-screen flex flex-col">
      {panelView && (
        <>
          <Blackout onClick={closePanel} isClosing={isPanelClosing} />
          <div className="fixed inset-y-0 right-0 z-200">
            <SlidingPanel view={panelView} isClosing={isPanelClosing} />
          </div>
        </>
      )}

      <EditTrack isOpen={modalView === MODAL_VIEWS.editTrack} onClose={closeModal} trackId={editTrackId}/>
      <EditPlayList isOpen={modalView === MODAL_VIEWS.editPlaylist} onClose={closeModal} playlistId={editPlaylistId}/>

      <div className="w-full h-full flex justify-between">
        <div className="h-full flex items-center justify-center flex-1">
          <Player />
        </div>
        <div className="my-[32px] mr-[32px] h-full">
          <NavigationSidebar />
        </div>
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </main>
  )
}