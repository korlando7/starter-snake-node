import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Move, Point } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString, removeOutOfBoundsDirs, removeInvalidMoves, getBoardHazards } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
	const gameData = request.body as BattleSnakeRequest

	let move: Move = 'up'

	if (!gameData || !gameData.you || !gameData.board) {
		response.status(200).send('Missing Data')
		return
	}

	findBestMoves(gameData)

	const res: BattleSnakeResponse = {
		move,
	}

	response.status(200).send(res)
}


export const findBestMoves = (gameData: BattleSnakeRequest) => {
	const hazards = getBoardHazards(gameData)
	const { board, you } = gameData
	const { width, height } = board
	const { body } = you


	const find = (snakeBody: Point[], originalDir: string, moveCount: number) => {
		let currPos = snakeBody[0]

		const snakeHazards = hazards

		snakeBody.forEach(point => {
			snakeHazards.add(getPointString(point))
		})

		const dirs = getPossibleDirections(currPos)
		removeInvalidMoves(gameData.board, dirs, snakeHazards)

		const availableMoves = Object.keys(dirs) as Move[]

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
}
