import PlayListItem from "../../../shared/ui/Lists/PlayListItem"
import { SlidingPanelPlaylistsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { usePagination } from "../../../shared/lib"
import { usePlaylistStore, ALL_MUSIC_ID } from "../../../entities/playlist"
import { useAudioStore } from "../../Player/model/audioStore"

const PLAYLISTS_PER_PAGE = 10

function SlidingPanelPlaylists({ onEdit, onCreate, onOpenMusics }: SlidingPanelPlaylistsProps) {
    const playlists = usePlaylistStore((state) => state.playlists)
    const deletePlaylist = usePlaylistStore((state) => state.deletePlaylist)
    const allMusicCount = useAudioStore((state) => state.playList.length)

    const { visibleItems, hasMore, showMore } = usePagination(playlists, PLAYLISTS_PER_PAGE)

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
                            musicCount={playlist.id === ALL_MUSIC_ID ? allMusicCount : playlist.trackIds.length}
                            isSelected={playlist.id === ALL_MUSIC_ID}
                            isLocked={playlist.isLocked}
                            onClick={() => onOpenMusics(playlist.id)}
                            onEdit={playlist.isLocked ? undefined : () => onEdit(playlist.id)}
                            onDelete={playlist.isLocked ? undefined : () => deletePlaylist(playlist.id)}
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
