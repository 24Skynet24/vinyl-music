import NavSidebarSearch from "../../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"
import { SlidingPanelProps } from "../model/types"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"

function SlidingPanel ({ view, isClosing = false }: SlidingPanelProps) {
    const openModal = useNavigationStore((state) => state.openModal)
    return (
        <section className={`w-[900px] h-screen bg-gradient-1 absolute z-200 top-0 right-0 ${isClosing ? "right-slide-out" : "right-slide"}`}>
            <div className="p-[32px] flex flex-col gap-[48px]">
                <div>
                    <NavSidebarSearch 
                        onSearch={() => {}} 
                        onSort={() => {}}
                    />
                </div>
                <div>
                    {view === "musics" ? (
                        <SlidingPanelMusics onEditTrack={() => openModal("editTrack")}/>
                    ) : (
                        <SlidingPanelPlaylists onEdit={() => openModal("editPlaylist")}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SlidingPanel