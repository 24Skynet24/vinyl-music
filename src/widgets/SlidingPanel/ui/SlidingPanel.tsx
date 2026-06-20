import NavSidebarSearch from "../../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"
import { SlidingPanelProps } from "../model/types"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { useAudioStore } from "../../Player/model/audioStore"
import SlidingPanelAddMusics from "./SlidingPanelAddMusics"
import { TrackType } from "../../../entities/track"
import { vinylApi } from "../../../shared/api/vinylApi"

function SlidingPanel ({ view, isClosing = false }: SlidingPanelProps) {
    const openEditTrack = useNavigationStore((state) => state.openEditTrack)
    const openEditPlaylist = useNavigationStore((state) => state.openEditPlaylist)
    const openPanel = useNavigationStore((state) => state.openPanel)
    const openPlaylistMusics = useNavigationStore((state) => state.openPlaylistMusics)
    const selectedPlaylistId = useNavigationStore((state) => state.selectedPlaylistId)
    const closePanel = useNavigationStore((state) => state.closePanel)
    const setTracks = useAudioStore((state) => state.setTracks)

    const handleSaveNewMusic = async (tracks: TrackType[]) => {
        const library = await vinylApi.saveTracks(tracks)
        setTracks(library.tracks)
        closePanel()
    }

    const renderContent = (): React.ReactNode => {
        switch (view) {
            case "musics":
                return <SlidingPanelMusics onEditTrack={openEditTrack} playlistId={selectedPlaylistId} onBack={() => openPanel("playlists")}/>
            case "add-music":
                return <SlidingPanelAddMusics onCancel={closePanel} onSave={handleSaveNewMusic} />
            case "playlists":
                return <SlidingPanelPlaylists onEdit={openEditPlaylist} onCreate={() => openEditPlaylist(null)} onOpenMusics={openPlaylistMusics}/>
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