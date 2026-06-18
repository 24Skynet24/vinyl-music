import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { NavigationSidebar } from "../../../widgets/NavigationSidebar"
import { Player } from "../../../widgets/Player"
import { SlidingPanel } from "../../../widgets/SlidingPanel"
import EditPlayList from "../../../features/EditPlaylist/ui/EditPlayList"
import EditTrack from "../../../features/EditTrack/ui/EditTrack"
import Blackout from "../../../shared/ui/Overlays/Blackout"

export function MainPage() {
  const { panelView, modalView, isPanelClosing, closePanel, closeModal } = useNavigationStore()

  return (
    <main className="w-full pb-[32px]">
      {panelView && (
        <>
          <Blackout onClick={closePanel} isClosing={isPanelClosing} />
          <div className="fixed inset-y-0 right-0 z-200">
            <SlidingPanel view={panelView} isClosing={isPanelClosing} />
          </div>
        </>
      )}

      {modalView === "editTrack" && <EditTrack isOpen={true} onClose={closeModal}/>}
      {modalView === "editPlaylist" && <EditPlayList isOpen={true} onClose={closeModal}/>}

      <div className="w-full flex justify-between">
        <div className="flex items-center justify-center flex-1">
          <Player />
        </div>
        <div className="my-[32px] mr-[32px]">
          <NavigationSidebar />
        </div>
      </div>
    </main>
  )
}