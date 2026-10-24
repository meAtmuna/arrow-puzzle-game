import { useState } from "react"
import { level1 } from "./game/levels"
import Board from "./components/Board"

export default function App() {
  const [arrows] = useState(level1.arrows)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-pink-400">Arrow Puzzle Game</h1>
      <Board size={level1.size} arrows={arrows} />
    </div>
  )
}
