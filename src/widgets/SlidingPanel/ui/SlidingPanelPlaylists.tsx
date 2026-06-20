import PlayListItem from "../../../shared/ui/Lists/PlayListItem"
import SlidingPanelMusics from "./SlidingPanelMusics"
import { SlidingPanelPlaylistsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { usePagination } from "../../../shared/lib"
import { usePlaylistStore, ALL_MUSIC_ID } from "../../../entities/playlist"
import { useAudioStore } from "../../Player/model/audioStore"
import { vinylApi } from "../../../shared/api/vinylApi"
import { useEffect, useState } from "react"
import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"

const PLAYLISTS_PER_PAGE = 10

function SlidingPanelPlaylists({ onEdit, onCreate, onOpenMusics }: SlidingPanelPlaylistsProps) {
    const playlists = usePlaylistStore((state) => state.playlists)
    const setPlaylists = usePlaylistStore((state) => state.setPlaylists)
    const allMusicTracks = useAudioStore((state) => state.libraryTracks)
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const playTracksQueue = useAudioStore((state) => state.playTracksQueue)
    const selectTracksQueueFrom = useAudioStore((state) => state.selectTracksQueueFrom)
    const activePlaylistId = useAudioStore((state) => state.activePlaylistId)
    const isPlaying = useAudioStore((state) => state.isPlaying)
    const setIsPlaying = useAudioStore((state) => state.setIsPlaying)
    const openEditTrack = useNavigationStore((state) => state.openEditTrack)
    const [isPlaylistListVisible, setIsPlaylistListVisible] = useState(false)

    useEffect(() => {
        setIsPlaylistListVisible(false)
    }, [activePlaylistId])

    const { visibleItems, hasMore, showMore } = usePagination(playlists, PLAYLISTS_PER_PAGE)
    const activePlaylist = playlists.find((playlist) => playlist.id === activePlaylistId)
    const isActivePlaylistVisible = Boolean(
        activePlaylist &&
        activePlaylist.id !== ALL_MUSIC_ID &&
        isPlaying &&
        !isPlaylistListVisible
    )

    const handleDelete = async (playlistId: string) => {
        const shouldResetActiveQueue = activePlaylistId === playlistId
        const currentTrackId = playList[currentIndex]?.id
        const library = await vinylApi.deletePlaylist(playlistId)

        if (shouldResetActiveQueue) {
            if (currentTrackId) {
                selectTracksQueueFrom(allMusicTracks, currentTrackId, ALL_MUSIC_ID, true)
            } else {
                playTracksQueue(allMusicTracks, ALL_MUSIC_ID)
            }

            setIsPlaylistListVisible(true)
        }

        setPlaylists(library.playlists)
    }

    const handlePlay = (playlistId: string) => {
        const playlist = playlists.find((item) => item.id === playlistId)
        if (!playlist) return

        if (activePlaylistId === playlistId) {
            if (!isPlaying && playlistId !== ALL_MUSIC_ID) {
                setIsPlaylistListVisible(false)
            }
            setIsPlaying(!isPlaying)
            return
        }

        const tracks = playlist.id === ALL_MUSIC_ID
            ? allMusicTracks
            : allMusicTracks.filter((track) => playlist.trackIds.includes(track.id))

        playTracksQueue(tracks, playlist.id)
        setIsPlaylistListVisible(playlist.id === ALL_MUSIC_ID)
    }

    if (isActivePlaylistVisible) {
        return (
            <SlidingPanelMusics
                onEditTrack={openEditTrack}
                playlistId={activePlaylistId}
                onBack={() => setIsPlaylistListVisible(true)}
            />
        )
    }

    return (
        <div className="flex flex-col gap-[32px]">
            <ul className="flex flex-col gap-[32px] overflow-y-auto pb-[16px] pr-[16px] max-h-[71vh]">
                {visibleItems.map((playlist) => (
                    <li key={playlist.id}>
                        <PlayListItem
                            id={playlist.id}
                            title={playlist.title}
                            description={playlist.description}
                            img={playlist.img}
                            musicCount={playlist.id === ALL_MUSIC_ID ? allMusicTracks.length : playlist.trackIds.length}
                            isSelected={activePlaylistId === playlist.id && isPlaying}
                            isPlaying={activePlaylistId === playlist.id && isPlaying}
                            isLocked={playlist.isLocked}
                            onClick={() => onOpenMusics(playlist.id)}
                            onPlay={() => handlePlay(playlist.id)}
                            onEdit={playlist.isLocked ? undefined : () => onEdit(playlist.id)}
                            onDelete={playlist.isLocked ? undefined : () => handleDelete(playlist.id)}
                        />
                    </li>
                ))}
                {hasMore && (
                    <li className="flex justify-center mt-[32px]">
                        <TextButton text="Show more" onClick={showMore} minWidth={180} />
                    </li>
                )}
            </ul>

            <button
                onClick={onCreate}
                className="flex items-center justify-center w-full h-[64px] border-orange-main border-2 border-dashed cursor-pointer"
            >
                <span className="text-[36px] text-orange-main uppercase text-center select-none">
                    add new playlist
                </span>
            </button>
        </div>
    )
}

export default SlidingPanelPlaylists
