import PlayListItem from "../../shared/ui/Listes/PlayListItem"

function SlidingPanelPlaylists() {
    return (
        <ul className="flex flex-col gap-[32px]">
            <li>
                <PlayListItem
                    id={0}
                    title="All musics"
                    musicCount={0}
                    isSelected={true}
                    description="All your musics"
                    onEdit={() => {}}
                />
            </li>
            <li>
                <PlayListItem
                    id={1}
                    title="Playlist 1"
                    musicCount={0}
                    isSelected={false}
                    onEdit={() => {}}
                    onDelete={() => {}}
                />
            </li>
        </ul>   
    )
}

export default SlidingPanelPlaylists