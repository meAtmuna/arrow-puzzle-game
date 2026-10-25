import { useState } from "react"
import { level1 } from "./game/levels"
import Board from "./components/Board"
import { canEscape, isWin, removeArrow, getSlideDistance, getFreeSteps } from "./game/logic"
import { Heart, HeartCrack, RotateCcw } from "lucide-react"

const maxLives = 3

export default function App() {
  const [arrows, setArrows] = useState(level1.arrows)
  const [moves, setMoves] = useState(0)
  const [blockedId, setBlockedId] = useState(null)
  const [leaving, setLeaving] = useState(null)
  const [lives, setLives] = useState(maxLives)

  function slideOut(arrow) {
    const distance =  getSlideDistance(arrow, level1.size)
    const speed = 8 
    const start = performance.now()

    function frame(now) {
      const offset = Math.max(0, ((now - start) / 1000) * speed)

      if (offset >= distance) {
        setArrows((old) => removeArrow(old, arrow.id))
        setLeaving(null)
        return
      }

      setLeaving({ id: arrow.id, offset: offset })
      requestAnimationFrame(frame)
    }

    setLeaving({ id: arrow.id, offset: 0 })
    requestAnimationFrame(frame)
  }

  function bumpBack(arrow) {
    const maxOffset = getFreeSteps(arrow, arrows, level1.size) + 0.7
    const speed = 10
    const goTime = maxOffset / speed
    const start  = performance.now()

    function frame(now) {
      const time = Math.max(0, now - start) / 1000
      let offset

      if (time < goTime) {
        offset = time * speed
      } else {
        setBlockedId(arrow.id)
        offset = maxOffset - (time - goTime) * speed

        if (offset <= 0) {
          setLeaving(null)
          setBlockedId(null)
          return
        }
      }

      setLeaving({ id: arrow.id, offset: offset })
      requestAnimationFrame(frame)
    }

    setLeaving({ id: arrow.id, offset: 0 })
    requestAnimationFrame(frame)
  }

  function handleArrowClick(arrow) {
    if (isWin(arrows) || lives === 0 || leaving !== null) return
      setMoves(moves + 1)

      if (canEscape(arrow, arrows, level1.size)) {
        slideOut(arrow)
      } 
      else {
        setLives(lives - 1)
        bumpBack(arrow)
      }
  }

  function restart() {
    if (leaving !== null) return
    setArrows(level1.arrows)
    setMoves(0)
    setLives(maxLives)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold text-pink-500">Arrow Puzzle Game</h1>
      <div className="flex gap-2">
        {[1, 2, 3].map((n) =>
          n <= lives ? (
            <Heart key={n} size={32} className="text-red-500" fill="currentColor" />
          ) : (
            <Heart key={n} size={32} className="text-slate-300" />
          )
        )}
      </div>
      <p className="text-xl text-slate-700">Moves: {moves}</p>
      <Board 
        size={level1.size}
        arrows={arrows}
        onArrowClick={handleArrowClick}
        blockedId={blockedId}
        leaving={leaving}
      />

      {isWin(arrows) && (
        <p className="text-2xl font-bold text-green-600">
          Jeet Gaye! {moves} moves mein
        </p>
      )}
      {lives === 0 && (
        <p className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <HeartCrack size={28} /> Game Over
        </p>
      )}
      <button
        onClick={restart}
        className="flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
      >
        <RotateCcw size={18} /> Restart
      </button>
    </div>
  )
}
