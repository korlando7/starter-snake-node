import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Point } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString, removeOutOfBoundsDirs, removeInvalidMoves, getBoardHazards } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
	const gameData = request.body as BattleSnakeRequest

	let move;

	if (!gameData || !gameData.you || !gameData.board) {
		response.status(200).send('Missing Data')
		return
	}

	const moves = findBestMoves(gameData)

	move = getBestMove(moves)

	const res: BattleSnakeResponse = {
		move,
	}

	response.status(200).send(res)
}


export const findBestMoves = (gameData: BattleSnakeRequest): { [move: string]: number } => {
	const hazards = getBoardHazards(gameData)
	const { board, you } = gameData
	const { width, height } = board
	const { body } = you
	const bestMoves: { [move: string]: number } = {}

	const find = (snakeBody: Point[], originalDir: string, moveCount: number) => {

		if (moveCount >= 10) {
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

				updatedSnake.pop()

				const dir = moveCount > 0 ? originalDir : move;
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
