import { useAudioStore } from "../../Player/model/audioStore"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import { SlidingPanelMusicsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { usePagination } from "../../../shared/lib"
import { usePlaylistStore, ALL_MUSIC_ID } from "../../../entities/playlist"

const MUSICS_PER_PAGE = 20

function SlidingPanelMusics({ onEditTrack, playlistId, onBack }: SlidingPanelMusicsProps) {
    const libraryTracks = useAudioStore((state) => state.libraryTracks)
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const selectTrack = useAudioStore((state) => state.selectTrack)
    const selectTracksQueueFrom = useAudioStore((state) => state.selectTracksQueueFrom)
    const playlist = usePlaylistStore((state) =>
        playlistId ? state.playlists.find((item) => item.id === playlistId) : undefined
    )

    const tracks = libraryTracks
        .map((track, index) => ({ track, index }))
        .filter(({ track }) => {
            if (!playlist || playlist.id === ALL_MUSIC_ID) return true

            return playlist.trackIds.includes(track.id)
        })

    const getQueueIndex = (trackId: string) =>
        playList.findIndex((track) => track.id === trackId)

    const isCurrentQueue = tracks.length === playList.length &&
        tracks.every(({ track }, index) => track.id === playList[index]?.id)

    const handleSelectTrack = (trackId: string) => {
        const queueIndex = getQueueIndex(trackId)
        if (isCurrentQueue && queueIndex >= 0) {
            selectTrack(queueIndex)
            return
        }

        selectTracksQueueFrom(tracks.map(({ track }) => track), trackId)
    }

    const { visibleItems, hasMore, showMore } = usePagination(tracks, MUSICS_PER_PAGE)

    return (
        <div className="flex flex-col gap-[32px]">
            {playlistId && (
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-[12px] w-fit text-white-main transition-colors duration-300 hover:text-orange-main cursor-pointer"
                >
                    <svg className="w-[32px] h-[32px]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.8 25.6L11.2 16L20.8 6.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[24px] uppercase">back to playlists</span>
                </button>
            )}

            <ul className="flex flex-col gap-[32px] overflow-y-auto pb-[16px] max-h-[72vh]">
            {visibleItems.map(({ track, index }) => {
                const queueIndex = getQueueIndex(track.id)

                return (
                <li key={`musics-${track.id}-${index}`}>
                    <PlayListTrack
                        id={track.id}
                        title={track.title}
                        duration={track.duration}
                        isSelected={queueIndex === currentIndex}
                        artist={track.artist}
                        album={track.album}
                        img={track.img}
                        onClick={() => handleSelectTrack(track.id)}
                        editPlaylist={() => onEditTrack(track.id)}
                    />
                </li>
                )
            })}
            {hasMore && (
                <li className="flex justify-center mt-[32px]">
                    <TextButton text="Show more" onClick={showMore} minWidth={180} />
                </li>
            )}
            </ul>
        </div>
    )
}

export default SlidingPanelMusics
