import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Move, Point, Snake } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString, removeOutOfBoundsDirs, getBoardHazards, removeInvalidMoves } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
	const gameData = request.body as BattleSnakeRequest
	let move: Move = 'up'

	if (!gameData || !gameData.you || !gameData.board) {
		response.status(200).send('Missing Data')
		return
	}

	console.log(JSON.stringify(gameData.you))

	const possibleCollisions = getPossibleCollisions(gameData)
	const possibleDirections = getPossibleDirections(gameData.you.head)

	removeInvalidMoves(gameData.board, possibleDirections, possibleCollisions)

	const availableMoves = Object.keys(possibleDirections) as Move[]

	if (availableMoves.length) {
		move = availableMoves[Math.floor(Math.random() * availableMoves.length)]
	}

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
			})
		}

	}
}
