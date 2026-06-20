import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import NavSidebarButton from "../../../shared/ui/Buttons/NavSidebarButton"

function NavigationSidebar () {
    const openPanel = useNavigationStore((state) => state.openPanel)
    return (
        // <aside className="h-[650px] min-[1440px]:h-[700px] min-[1800px]:h-[850px] p-[16px] bg-black-main/30 flex flex-col gap-[32px] items-center rounded-[16px]">
        <aside className="h-[calc(100%-10vh)] p-[16px] bg-black-main/30 flex flex-col gap-[32px] items-center rounded-[16px]">
            <NavSidebarButton
                onClick={() => openPanel("musics")}
                isPlaying={true}
                view="musics"
            />
            <NavSidebarButton
                onClick={() => openPanel("playlists")}
                view="playlists"
            />
            <NavSidebarButton
                onClick={() => openPanel("add-music")}
                view="add-music"
            />
        </aside>
    )
}

export default NavigationSidebar