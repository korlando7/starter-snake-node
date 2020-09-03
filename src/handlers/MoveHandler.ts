import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Move, Point } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString, removeOutOfBoundsDirs } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
  const gameData = request.body as BattleSnakeRequest
  let move: Move = 'up'

  const possibleCollisions = getPossibleCollisions(gameData)

  const possibleCollPointSet = getPointSet(possibleCollisions)
  const possibleDirections = getPossibleDirections(gameData.you)

  Object.keys(possibleDirections).forEach((dir: string) => {
    const point: Point = possibleDirections[dir]
    const pointStr = getPointString(point)

    if (possibleCollPointSet.has(pointStr)) {
      delete possibleDirections[dir]
    }
  })

  removeOutOfBoundsDirs(possibleDirections, gameData.board.width, gameData.board.height)

  // get optimal direction
  // TODO: move to position with most available space and food?
  // TODO: find closet food

  const availableMoves = Object.keys(possibleDirections) as Move[]

  if (availableMoves.length) {
    move = availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  const res: BattleSnakeResponse = {
    move,
  }

  response.status(200).send(res)
}

