import NavSidebarButton from "../../shared/ui/Buttons/NavSidebarButton"

function NavigationSidebar () {
    return (
        <aside className="w-[128px] h-[800px] py-[32px] bg-black-main/30 flex flex-col gap-[32px] items-center rounded-[16px]">
            <NavSidebarButton
                onClick={() => {}}
                isPlaying={true}
                view="musics"
            />
            <NavSidebarButton
                onClick={() => {}}
                view="playlists"
            />
        </aside>
    )
}

export default NavigationSidebar