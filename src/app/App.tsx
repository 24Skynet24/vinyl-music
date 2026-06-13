import { Header } from "../widgets/Header"
import { Player } from "../widgets/Player"

function App() {
  return (
    <>
    <main className="w-full pb-[32px]">
      <Header/>
      <div className="w-full flex items-center justify-center">
        <Player/>
      </div>
    </main>
    </>
  )
}

export default App
