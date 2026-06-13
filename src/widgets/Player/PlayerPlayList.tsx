import PlayListItem from "../../shared/ui/Listes/PlayListItem"

function PlayerPlayList () {
    return (
        <section>
            <ul className="flex flex-col gap-[32px]">
                <PlayListItem
                    musicName="Sean Dagher, Sean Dagher Sean Dagher"
                    duration={173}
                    isPlaying={true}
                    authorName="Sean Dagher, Sean Dagher Sean Dagher"
                    albumName="Sean Dagher, Sean Dagher Sean Dagher"
                    onClick={() => console.log(1)}
                />

                <PlayListItem
                    musicName="Sean Dagher, Sean Dagher Sean Dagher"
                    duration={180}
                    isPlaying={false}
                    authorName="Sean Dagher, Sean Dagher Sean Dagher"
                    albumName="Sean Dagher, Sean Dagher Sean Dagher"
                    onClick={() => console.log(2)}
                />
            </ul>
        </section>
    )
}

export default PlayerPlayList