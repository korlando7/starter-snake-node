import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse, Directions, Move, Point } from '../definitions/requestTypes'
import { getPointSet, getPossibleCollisions, getPossibleDirections, getPointString } from '../utils/positionUtil'


export const handleMove = (request: Request, response: Response) => {
  const gameData = request.body as BattleSnakeRequest
  let move: Move = 'up'

  const possibleCollisions = getPossibleCollisions(gameData)
  console.log(possibleCollisions)

  const possibleCollPointSet = getPointSet(possibleCollisions)
  const possibleDirections = getPossibleDirections(gameData.you)

  Object.keys(possibleDirections).forEach((dir: string) => {
    const point: Point = possibleDirections[dir]
    const pointStr = getPointString(point)

    if (possibleCollPointSet.has(pointStr)) {
      delete possibleDirections[dir]
    }
  })

  console.log(possibleDirections)

  // get optimal direction

  const availableMoves = Object.keys(possibleDirections) as Move[]

  if (availableMoves.length) {
    move = availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  console.log(move)

  const res: BattleSnakeResponse = {
    move,
  }

  response.status(200).send(res)
}

