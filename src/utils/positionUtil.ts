import { Point, Snake, Directions, BattleSnakeRequest, Board } from '../definitions/requestTypes'

export const getPointSet = (points: Point[]): Set<string> => {
	const result: Set<string> = new Set()

	if (!points) {
		return result
	}

	points.forEach((point: Point) => {
		result.add(getPointString(point))
	})

	return result
}

export const createPoint = (x: number, y: number): Point => {
	return { x, y }
}

export const getPointString = (point: Point) => {
	return `${point.x}:${point.y}`
}

export const checkForCollision = (
	currentPosition: Point,
	nextPosition: Point,
) => {
	if (currentPosition.x == nextPosition.x && currentPosition.y === nextPosition.y) {
		return true
	}

	return false
}

export const getPossibleCollisions = (data: BattleSnakeRequest): Set<string> => {
	const { board, you } = data
	const { hazards, snakes } = board
	const { body } = you
  
	let possibleCollisions = [
	  ...hazards,
	  ...body,
	]
  
	snakes.forEach((snake: Snake) => {
	  possibleCollisions = [...possibleCollisions, ...snake.body]
	})
  
	return getPointSet(possibleCollisions)
}

export const getBoardHazards = (data: BattleSnakeRequest): Set<string> => {
	const { board, you } = data
	const { hazards, snakes } = board

	let boardHazards = hazards

	snakes.forEach(snake => {
		if (snake.id !== you.id) {
			boardHazards = [...boardHazards, ...snake.body]
		}
	})

	return getPointSet(boardHazards)
}

export const getPossibleDirections = (snakeHead: Point): Directions => {
	const { x, y } = snakeHead
  
	return {
	  'up': { x, y: y + 1},
	  'down': { x, y: y - 1},
	  'right': { x: x + 1, y },
	  'left': { x: x - 1, y }
	}
  }

export const pointInBounds = (
	position: Point,
	boardW: number,
	boardH: number
): boolean => {
	const { x, y } = position

	if ((x >= 0 && x < boardW) &&
	    (y >= 0 && y < boardH)) {
			return true
	}

	return false
}

export const removeOutOfBoundsDirs = (
	possibleDirections: Directions,
	boardW: number,
	boardH: number
) => {
	Object.keys(possibleDirections).forEach(dir => {
		var point = possibleDirections[dir]

		if (!pointInBounds(point, boardW, boardH)) {
			delete possibleDirections[dir]
		}
	})
}

export const removeInvalidMoves = (
	board: Board,
	possibleDirections: Directions,
	possibleCollisions: Set<string>,
) => {

	Object.keys(possibleDirections).forEach((dir: string) => {
		const point: Point = possibleDirections[dir]
		const pointStr = getPointString(point)

		if (possibleCollisions.has(pointStr)) {
			delete possibleDirections[dir]
		}
	})

	removeOutOfBoundsDirs(possibleDirections, board.width, board.height)
}