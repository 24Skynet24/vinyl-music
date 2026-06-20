import NavSidebarSearch from "../../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"
import { SlidingPanelProps } from "../model/types"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { useAudioStore } from "../../Player/model/audioStore"
import SlidingPanelAddMusics from "./SlidingPanelAddMusics"
import { TrackType } from "../../../entities/track"
import { vinylApi } from "../../../shared/api/vinylApi"
import { useEffect, useState } from "react"
import { MusicSortType, PlaylistSortType } from "../model/types"

const musicSortOptions: { value: MusicSortType, label: string }[] = [
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist" },
    { value: "album", label: "Album" },
    { value: "duration", label: "Duration" },
]

const playlistSortOptions: { value: PlaylistSortType, label: string }[] = [
    { value: "title", label: "Title" },
    { value: "tracksCount", label: "Tracks" },
]

function SlidingPanel ({ view, isClosing = false }: SlidingPanelProps) {
    const openEditTrack = useNavigationStore((state) => state.openEditTrack)
    const openEditPlaylist = useNavigationStore((state) => state.openEditPlaylist)
    const openPanel = useNavigationStore((state) => state.openPanel)
    const openPlaylistMusics = useNavigationStore((state) => state.openPlaylistMusics)
    const selectedPlaylistId = useNavigationStore((state) => state.selectedPlaylistId)
    const closePanel = useNavigationStore((state) => state.closePanel)
    const setTracks = useAudioStore((state) => state.setTracks)
    const [searchQuery, setSearchQuery] = useState("")
    const [musicSortType, setMusicSortType] = useState<MusicSortType>("title")
    const [playlistSortType, setPlaylistSortType] = useState<PlaylistSortType>("title")
    const [isPlaylistMusicView, setIsPlaylistMusicView] = useState(false)

    useEffect(() => {
        setSearchQuery("")
        setIsPlaylistMusicView(false)
    }, [view])
    
    const handleSaveNewMusic = async (tracks: TrackType[]) => {
        const library = await vinylApi.saveTracks(tracks)
        setTracks(library.tracks)
        closePanel()
    }

    const isMusicSearch = view === "musics" || isPlaylistMusicView
    const placeholder = isMusicSearch
        ? "Search by title, year, album or artist..."
        : "Search by playlist name..."
    const sortOptions = isMusicSearch ? musicSortOptions : playlistSortOptions
    const selectedSort = isMusicSearch ? musicSortType : playlistSortType

    const handleSort = (value: string) => {
        if (isMusicSearch) {
            setMusicSortType(value as MusicSortType)
            return
        }

        setPlaylistSortType(value as PlaylistSortType)
    }

    useEffect(() => {
        setSearchQuery("")
    }, [isMusicSearch])

    const renderContent = (): React.ReactNode => {
        switch (view) {
            case "musics":
                return <SlidingPanelMusics onEditTrack={openEditTrack} playlistId={selectedPlaylistId} onBack={() => openPanel("playlists")} searchQuery={searchQuery} sortType={musicSortType}/>
            case "add-music":
                return <SlidingPanelAddMusics onCancel={closePanel} onSave={handleSaveNewMusic} />
            case "playlists":
                return <SlidingPanelPlaylists onEdit={openEditPlaylist} onCreate={() => openEditPlaylist(null)} onOpenMusics={openPlaylistMusics} searchQuery={searchQuery} playlistSortType={playlistSortType} musicSortType={musicSortType} onActivePlaylistViewChange={setIsPlaylistMusicView}/>
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
                            placeholder={placeholder}
                            value={searchQuery}
                            sortOptions={sortOptions}
                            selectedSort={selectedSort}
                            onChange={setSearchQuery}
                            onSearch={() => {}}
                            onSort={handleSort}
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