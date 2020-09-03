import { Point, Snake, Directions, BattleSnakeRequest } from '../definitions/requestTypes'

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

export const getPossibleCollisions = (data: BattleSnakeRequest): Point[] => {
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
  
	return possibleCollisions
  }

export const getPossibleDirections = (currentSnake: Snake): Directions => {
	const { head } = currentSnake
	const { x, y } = head
  
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