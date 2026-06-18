import PlayListItem from "../../../shared/ui/Lists/PlayListItem"
import { SlidingPanelPlaylistsProps } from "../model/types"
import TextButton from "../../../shared/ui/Buttons/TextButton"

function SlidingPanelPlaylists({ onEdit }: SlidingPanelPlaylistsProps) {
    return (
        <ul className="flex flex-col gap-[32px]">
            <li>
                <PlayListItem
                    id={0}
                    title="All musics"
                    musicCount={0}
                    isSelected={true}
                    description="All your musics"
                    onEdit={onEdit}
                />
            </li>
            <li>
                <PlayListItem
                    id={1}
                    title="Playlist 1"
                    musicCount={0}
                    isSelected={false}
                    onEdit={onEdit}
                    onDelete={() => {}}
                />
            </li>
            <li className="flex justify-center mt-[32px]">
                <TextButton text="Show more" onClick={() => {}} minWidth={180} />
            </li>
        </ul>   
    )
}

export default SlidingPanelPlaylists