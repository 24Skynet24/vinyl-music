import NavSidebarButton from "../../shared/ui/Buttons/NavSidebarButton"

function NavigationSidebar () {
    return (
        <aside className="h-[650px] min-[1440px]:h-[650px] p-[16px] bg-black-main/30 flex flex-col gap-[32px] items-center rounded-[16px]">
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