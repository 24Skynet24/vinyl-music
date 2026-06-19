import NavSidebarSearch from "../../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"
import { SlidingPanelProps } from "../model/types"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import SlidingPanelAddMusics from "./SlidingPanelAddMusics"

function SlidingPanel ({ view, isClosing = false }: SlidingPanelProps) {
    const openModal = useNavigationStore((state) => state.openModal)

    const renderContent = (): React.ReactNode => {
        switch (view) {
            case "musics":
                return <SlidingPanelMusics onEditTrack={() => openModal("editTrack")}/>
            case "add-music":
                return <SlidingPanelAddMusics />
            case "playlists":
                return <SlidingPanelPlaylists onEdit={() => openModal("editPlaylist")}/>
            default:
                return null
        }
    }
    
    return (
        <section className={`w-[900px] h-screen bg-gradient-1 absolute z-200 top-0 right-0 ${isClosing ? "right-slide-out" : "right-slide"}`}>
            <div className="p-[32px] flex flex-col gap-[48px]">
                {
                    view !== "add-music" && <div>
                        <NavSidebarSearch 
                            onSearch={() => {}} 
                            onSort={() => {}}
                        />
                    </div>
                }
                <div>
                    {renderContent()}
                </div>
            </div>
        </section>
    )
}

export default SlidingPanel