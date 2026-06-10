import PlayerControls from "../widgets/Player/ui/PlayerControls"
import PlayerDisk from "../widgets/Player/ui/PlayerDisk"

function App() {
  return (
    <>
    <main className="bg-gradient-1 w-full h-screen">
      <PlayerDisk isPlaying/>
      <PlayerControls/>
    </main>
    </>
  )
}

export default App
