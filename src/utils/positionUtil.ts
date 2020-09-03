import { Point } from '../types/requestTypes'

export const getPointSet = (points: Point[]): Set<string> => {
	const result: Set<string> = new Set()

	if (!points) {
		return result
	}

	points.forEach((point: Point) => {
		result.add(`${point.x}:${point.y}`)
	})

	return result
}

export const createPoint = (x: number, y: number): Point => {
	return { x, y }
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