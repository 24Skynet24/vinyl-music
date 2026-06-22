import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { NavigationSidebar } from "../../../widgets/NavigationSidebar"
import { Player } from "../../../widgets/Player"
import { SlidingPanel } from "../../../widgets/SlidingPanel"
import EditPlayList from "../../../features/EditPlaylist/ui/EditPlayList"
import EditTrack from "../../../features/EditTrack/ui/EditTrack"
import Blackout from "../../../shared/ui/Overlays/Blackout"
import { Footer } from "../../../widgets/Footer"
import { MODAL_VIEWS } from "../../../features/Navigation/model/views"
import { useLoadMusicLibrary } from "../lib/useLoadMusicLibrary"
import { useMainPageHotkeys } from "../lib/useMainPageHotkeys"

export function MainPage() {
  const { panelView, modalView, isPanelClosing, editTrackId, editPlaylistId, closePanel, closeModal } = useNavigationStore()

  useLoadMusicLibrary()
  useMainPageHotkeys({ isEnabled: !panelView })

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