const steps ={
    up: { row: -1, col: 0 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
}

export function getHead(arrow){
    return arrow.cells[arrow.cells.length - 1]
}

export function getDirection(arrow){
    const [row1, col1] = arrow.cells[arrow.cells.length - 2]
    const [row2, col2] = arrow.cells[arrow.cells.length - 1]
    
    if (row2 < row1) return 'up'
    if (row2 > row1) return 'down'
    if (col2 < col1) return 'left'
    return 'right'
}

export function isOccupied(arrows, row, col) {
    return arrows.some((arrow) => 
        arrow.cells.some((cell) => cell[0] === row && cell[1] === col)
    )
}

export function canEscape(arrow, arrows, size){
    const step = steps[getDirection(arrow)]
    const head  = getHead(arrow)

    let row = head[0] + step.row
    let col = head[1] + step.col

    while (row >= 0 && row < size && col >= 0 && col < size) {
        if (isOccupied(arrows, row, col)) {
            return false
        }
        row += step.row
        col += step.col
    }

    return true
}

export function removeArrow(arrows, id) {
    return arrows.filter((a) => a.id !== id)
}

export function isWin(arrows) {
    return arrows.length === 0
}