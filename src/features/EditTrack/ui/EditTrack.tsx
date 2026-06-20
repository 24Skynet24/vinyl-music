import PlayListItem from "../../../shared/ui/Lists/PlayListItem"
import Modal from "../../../shared/ui/Modal/Modal"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { EditTrackProps } from "../types"
import { usePlaylistStore, ALL_MUSIC_ID } from "../../../entities/playlist"
import { usePagination } from "../../../shared/lib"
import { vinylApi } from "../../../shared/api/vinylApi"

const PLAYLISTS_PER_PAGE = 5

function EditTrack ({ isOpen, onClose, trackId }: EditTrackProps) {
    const playlists = usePlaylistStore((state) => state.playlists)
    const setPlaylists = usePlaylistStore((state) => state.setPlaylists)
    const editablePlaylists = playlists.filter((playlist) => playlist.id !== ALL_MUSIC_ID)

    const { visibleItems, hasMore, showMore } = usePagination(editablePlaylists, PLAYLISTS_PER_PAGE)

    const handleToggle = async (playlistId: string, targetTrackId: string) => {
        const library = await vinylApi.toggleTrackInPlaylist(playlistId, targetTrackId)
        setPlaylists(library.playlists)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-[800px] min-h-[500px] max-h-[700px] flex justify-center pt-[64px]">
                {editablePlaylists.length === 0 ? (
                    <div className="w-full flex items-center justify-center px-[32px] pb-[64px]">
                        <span className="text-[36px] text-orange-main uppercase text-center">
                            You don't have any playlists
                        </span>
                    </div>
                ) : (
                <ul className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-[32px] mx-[32px] mb-[32px]">
                    {visibleItems.map((playlist) => {
                        const isHaveTrack = trackId ? playlist.trackIds.includes(trackId) : false
                        const toggle = !trackId
                            ? undefined
                            : () => handleToggle(playlist.id, trackId)

                        return (
                            <li key={playlist.id}>
                                <PlayListItem
                                    id={playlist.id}
                                    title={playlist.title}
                                    description={playlist.description}
                                    img={playlist.img}
                                    musicCount={playlist.trackIds.length}
                                    isSelected={false}
                                    isEditTrack={true}
                                    isHaveTrack={isHaveTrack}
                                    onAddTrack={toggle}
                                    onRemoveTrack={toggle}
                                />
                            </li>
                        )
                    })}

                    {hasMore && (
                        <li className="flex justify-center">
                            <TextButton text="Show more" onClick={showMore} minWidth={180} />
                        </li>
                    )}
                </ul>
                )}
            </div>
        </Modal>
    )
}

export default EditTrack
