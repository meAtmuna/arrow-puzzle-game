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

export function getSlideDistance(arrow, size) {
    return arrow.cells.length + size
}

export function getSlidePoints(arrow, size, offset) {
    const step = steps[getDirection(arrow)]
    const head =getHead(arrow)
    const length= arrow.cells.length - 1

    const path = [...arrow.cells]
    for (let i = 1; i <= size + arrow.cells.length + 2; i++) {
        path.push([head[0] + step.row * i, head[1] + step.col * i])
    }

    const first =Math.floor(offset)
    const frac = offset - first

    function between(a, b) {
        return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]
    }

    const points = []
    points.push(between(path[first], path[first + 1]))

    for (let i = first + 1; i <= first +  length; i++) {
        points.push(path[i])
    }

    points.push(between(path[first + length], path[first + length + 1]))
    return points
}