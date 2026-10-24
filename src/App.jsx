import { useState } from "react"
import { level1 } from "./game/levels"
import Board from "./components/Board"
import { canEscape, isWin, removeArrow } from "./game/logic"

export default function App() {
  const [arrows, setArrows] = useState(level1.arrows)
  const [moves, setMoves] = useState(0)
  const [blockedId, setBlockedId] = useState(null)

  function handleArrowClick(arrow) {
    if (isWin(arrows)) return
      setMoves(moves + 1)

      if (canEscape(arrow, arrows, level1.size)) {
        setArrows(removeArrow(arrows, arrow.id))
      } 
      else {
        setBlockedId(arrow.id)
        setTimeout(() => setBlockedId(null), 400)
      }
  }

  function restart() {
    setArrows(level1.arrows)
    setMoves(0)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold text-pink-500">Arrow Puzzle Game</h1>
      <p className="text-xl text-slate-700">Moves: {moves}</p>
      <Board 
        size={level1.size}
        arrows={arrows}
        onArrowClick={handleArrowClick}
        blockedId={blockedId} 
      />

      {isWin(arrows) && (
        <p className="text-2xl font-bold text-green-600">
          Jeet Gaye! {moves} moves mein
        </p>
      )}
      <button
        onClick={restart}
        className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
      >
        Restart
      </button>
    </div>
  )
}
