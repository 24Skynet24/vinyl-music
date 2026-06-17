// import { Header } from "../widgets/Header"
// import Blackout from "../shared/ui/Overlays/Blackout"
import { NavigationSidebar } from "../widgets/NavigationSidebar"
import { Player } from "../widgets/Player"

function App() {
  return (
    <>
    <main className="w-full pb-[32px]">
      {/* <Blackout/> */}
      {/* <Header/> */}
      <div className="w-full flex justify-between">
        <div className="flex items-center justify-center flex-1">
          <Player/>
        </div>
        <div className="my-[32px] mr-[32px]">
          <NavigationSidebar/>
        </div>
      </div>
    </main>
    </>
  )
}

export default App
