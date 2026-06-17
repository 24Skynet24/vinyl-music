import NavSidebarSearch from "../../shared/ui/Searches/NavSidebarSearch"
import SlidingPanelMusics from "./SlidingPanelMusics"
import SlidingPanelPlaylists from "./SlidingPanelPlaylists"

function SlidingPanel () {
    return (
        <section className="w-[900px] h-screen bg-gradient-1 absolute z-200 top-0 right-0 right-slide">
            <div className="p-[32px] flex flex-col gap-[48px]">
                <div>
                    <NavSidebarSearch 
                        onSearch={() => {}} 
                        onSort={() => {}}
                    />
                </div>
                <div>
                    {/* <SlidingPanelMusics/> */}
                    <SlidingPanelPlaylists/>
                </div>
            </div>
        </section>
    )
}

export default SlidingPanel