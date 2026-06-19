import { useAudioStore } from "../../Player/model/audioStore"
import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import { SlidingPanelMusicsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { usePagination } from "../../../shared/lib"
import { usePlaylistStore, ALL_MUSIC_ID } from "../../../entities/playlist"

const MUSICS_PER_PAGE = 20

function SlidingPanelMusics({ onEditTrack, playlistId }: SlidingPanelMusicsProps) {
    const playList = useAudioStore((state) => state.playList)
    const currentIndex = useAudioStore((state) => state.currentIndex)
    const selectTrack = useAudioStore((state) => state.selectTrack)
    const playlist = usePlaylistStore((state) =>
        playlistId ? state.playlists.find((item) => item.id === playlistId) : undefined
    )

    const tracks = playList
        .map((track, index) => ({ track, index }))
        .filter(({ track }) => {
            if (!playlist || playlist.id === ALL_MUSIC_ID) return true

            return playlist.trackIds.includes(track.id)
        })

    const { visibleItems, hasMore, showMore } = usePagination(tracks, MUSICS_PER_PAGE)

    return (
        <ul className="flex flex-col gap-[32px] overflow-y-auto pb-[16px] max-h-[80vh]">
            {visibleItems.map(({ track, index }) => (
                <li key={`musics-${track.id}-${index}`}>
                    <PlayListTrack
                        id={track.id}
                        title={track.title}
                        duration={track.duration}
                        isSelected={index === currentIndex}
                        artist={track.artist}
                        album={track.album}
                        img={track.img}
                        onClick={() => selectTrack(index)}
                        editPlaylist={() => onEditTrack(track.id)}
                    />
                </li>
            ))}
            {hasMore && (
                <li className="flex justify-center mt-[32px]">
                    <TextButton text="Show more" onClick={showMore} minWidth={180} />
                </li>
            )}
        </ul>
    )
}

export default SlidingPanelMusics
