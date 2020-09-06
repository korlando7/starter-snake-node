import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Point } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString, removeOutOfBoundsDirs, removeInvalidMoves, getBoardHazards } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
	const gameData = request.body as BattleSnakeRequest
	// console.log(JSON.stringify(gameData))

	let move;

	if (!gameData || !gameData.you || !gameData.board) {
		response.status(200).send('Missing Data')
		return
	}

	const moves = findBestMoves(gameData)
	// console.log(moves)

	move = getBestMove(moves)

	const res: BattleSnakeResponse = {
		move,
	}

	response.status(200).send(res)
}


export const findBestMoves = (gameData: BattleSnakeRequest): { [move: string]: number } => {
	const hazards = getBoardHazards(gameData)
	const { board, you } = gameData
	const { width, height, food } = board
	const { body } = you
	const bestMoves: { [move: string]: number } = {}
	const foodPoints = getPointSet(food)

	const find = (snakeBody: Point[], originalDir: string, moveCount: number) => {

		if (moveCount >= width) {
			const currentCount = bestMoves[originalDir]
			bestMoves[originalDir] = currentCount ? currentCount + 1 : 1
			return
		}

		let currPos = snakeBody[0]

		const snakeHazards = hazards

		snakeBody.forEach(point => {
			snakeHazards.add(getPointString(point))
		})

		const dirs = getPossibleDirections(currPos)
		removeInvalidMoves(gameData.board, dirs, snakeHazards)

		const availableMoves = Object.keys(dirs) as string[]

		if (availableMoves.length) {
			availableMoves.forEach(move => {
				const nextPos = dirs[move]
				const updatedSnake = [nextPos, ...snakeBody]
				const tail = updatedSnake[updatedSnake.length - 1]

				updatedSnake.pop()

				const dir = moveCount > 0 ? originalDir : move;

				bestMoves[dir] = bestMoves[dir] ? bestMoves[dir] : 0
				const nextPosStr = getPointString(nextPos)

				// score next possible move, wip
				const disFromTail = Math.abs(nextPos.x - tail.x) + Math.abs(nextPos.y - tail.y)
				bestMoves[dir] += disFromTail

				if (foodPoints.has(nextPosStr)) {

					bestMoves[dir]++
				}

				if (snakeHazards.has(nextPosStr)) {
					bestMoves[dir]--
				}

				find(updatedSnake, dir, moveCount + 1)
			})
		}

	}

	find(body, '', 0)

	return bestMoves;
}

const getBestMove = (bestMoves: { [move: string]: number }): string | null => {
	let bestMove = null;
	let max = 0

	Object.keys(bestMoves).forEach(move => {
		if (bestMoves[move] > max) {
			max = bestMoves[move]
			bestMove = move;
		}
	})

	return bestMove;
}

const scoreNextMove = () => {

}
