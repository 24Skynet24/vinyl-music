import { Header } from "../widgets/Header"
import { Player } from "../widgets/Player"

function App() {
  return (
    <>
    <main className="bg-gradient-1 w-full h-screen">
      <Header/>
      <div className="w-full flex items-center justify-center">
        <Player/>
      </div>
    </main>
    </>
  )
}

export default App
