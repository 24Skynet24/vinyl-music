import NavSidebarSearch from "../../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"
import SlidingPanelEqualizer from "./SlidingPanelEqualizer"
import { SlidingPanelProps } from "../model/types"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { useAudioStore } from "../../../entities/audio"
import { usePlaylistStore } from "../../../entities/playlist"
import SlidingPanelAddMusics from "./SlidingPanelAddMusics"
import { TrackType } from "../../../entities/track"
import { vinylApi } from "../../../shared/api/vinylApi"
import { useEffect, useState } from "react"
import { MusicSortType, PlaylistSortType } from "../model/types"
import {
    MUSIC_SEARCH_PLACEHOLDER,
    PLAYLIST_SEARCH_PLACEHOLDER,
    musicSortOptions,
    playlistSortOptions,
} from "../model/constants"

const MUSIC_SORT_STORAGE_KEY = "vinyl-music:music-sort"

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage)

const isMusicSortType = (value: string): value is MusicSortType =>
    musicSortOptions.some((option) => option.value === value)

const readSavedMusicSortType = (): MusicSortType => {
    if (!canUseStorage()) return "title"

    const savedSort = window.localStorage.getItem(MUSIC_SORT_STORAGE_KEY)

    return savedSort && isMusicSortType(savedSort) ? savedSort : "title"
}

function SlidingPanel ({ view, isClosing = false }: SlidingPanelProps) {
    const openEditTrack = useNavigationStore((state) => state.openEditTrack)
    const openEditPlaylist = useNavigationStore((state) => state.openEditPlaylist)
    const openPanel = useNavigationStore((state) => state.openPanel)
    const openPlaylistMusics = useNavigationStore((state) => state.openPlaylistMusics)
    const selectedPlaylistId = useNavigationStore((state) => state.selectedPlaylistId)
    const closePanel = useNavigationStore((state) => state.closePanel)
    const addTracks = useAudioStore((state) => state.addTracks)
    const setPlaylists = usePlaylistStore((state) => state.setPlaylists)
    const [searchQuery, setSearchQuery] = useState("")
    const [musicSortType, setMusicSortType] = useState<MusicSortType>(readSavedMusicSortType)
    const [playlistSortType, setPlaylistSortType] = useState<PlaylistSortType>("title")
    const [isPlaylistMusicView, setIsPlaylistMusicView] = useState(false)

    useEffect(() => {
        setSearchQuery("")
        setIsPlaylistMusicView(false)
    }, [view])
    
    const handleSaveNewMusic = async (tracks: TrackType[]) => {
        const library = await vinylApi.saveTracks(tracks)
        addTracks(tracks)
        setPlaylists(library.playlists)
        closePanel()
    }

    const isMusicSearch = view === "musics" || isPlaylistMusicView
    const placeholder = isMusicSearch
        ? MUSIC_SEARCH_PLACEHOLDER
        : PLAYLIST_SEARCH_PLACEHOLDER
    const sortOptions = isMusicSearch ? musicSortOptions : playlistSortOptions
    const selectedSort = isMusicSearch ? musicSortType : playlistSortType

    const handleSort = (value: string) => {
        if (isMusicSearch) {
            if (!isMusicSortType(value)) return

            setMusicSortType(value)
            if (canUseStorage()) {
                window.localStorage.setItem(MUSIC_SORT_STORAGE_KEY, value)
            }
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
            case "equalizer":
                return <SlidingPanelEqualizer />
            default:
                return null
        }
    }

    const searchExceptions = new Set<string>(["equalizer", "add-music"])
    
    return (
        <section className={`w-[900px] h-screen bg-gradient-1 absolute z-200 top-0 right-0 ${isClosing ? "right-slide-out" : "right-slide"}`}>
            <div className="p-[32px] flex flex-col gap-[48px]">
                {
                    !searchExceptions.has(view) && <div>
                        <NavSidebarSearch 
                            placeholder={placeholder}
                            value={searchQuery}
                            sortOptions={sortOptions}
                            selectedSort={selectedSort}
                            onChange={setSearchQuery}
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