import { getDirection, getHead } from "../game/logic";

const gap =60
const pad = 30

const slide = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
}

function pos(index) {
    return pad + index * gap
}

function headPoints(x, y, dir) {
    if (dir ===  'up') return `${x},${y - 14} ${x - 9},${y} ${x + 9},${y}`
    if (dir === 'down') return `${x},${y + 14} ${x - 9},${y} ${x + 9},${y}`
    if (dir === 'left') return `${x - 14},${y} ${x},${y - 9} ${x},${y + 9}`
    return `${x + 14},${y} ${x},${y - 9} ${x},${y + 9}`
}

export default function Board({ size, arrows, onArrowClick, blockedId, leavingId }) {
    const total = pad * 2 + (size - 1) * gap

    const dots =[]
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            dots.push(
                <circle
                    key={row + '-' + col}
                    cx={pos(col)}
                    cy={pos(row)}
                    r="4"
                    className="fill-slate-300"
                />
            )
        }
    }

    return(
        <svg width={total} height={total}>
            {dots}
            {arrows.map((arrow) => {
                const line = arrow.cells.map((c) => pos(c[1]) + ',' + pos(c[0])).join(' ')
                const head = getHead(arrow)

                const isBlocked = blockedId === arrow.id
                const lineColor = isBlocked ? 'stroke-red-500' : 'stroke-slate-800'
                const headColor =isBlocked ? 'fill-red-500' : 'fill-slate-800'
                const isLeaving = leavingId === arrow.id 
                const [dx, dy] = slide[getDirection(arrow)]

                return(
                    <g 
                        key={arrow.id}
                        onClick={() => onArrowClick(arrow)}
                        style={{
                            cursor: 'pointer',
                            transform: isLeaving
                                ? `translate(${dx * total}px, ${dy * total}px)`
                                : 'translate(0px, 0px)',
                            opacity: isLeaving ? 0 : 1,
                            transition: 'transform 0.5s ease-in, opacity 0.5s ease-in',
                        }}
                    >
                        <polyline
                            points={line}
                            fill="none"
                            stroke="transparent"
                            strokeWidth="24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <polyline
                            points={line}
                            className={'fill-none ' + lineColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <polygon
                            points={headPoints(pos(head[1]), pos(head[0]), getDirection(arrow))}
                            className={headColor}
                        />
                    </g>
                )
            })}
        </svg>
    )
}