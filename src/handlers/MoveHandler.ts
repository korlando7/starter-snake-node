import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse } from '../types/requestTypes'


export const handleMove = (request: Request, response: Response) => {
  var gameData = request.body as BattleSnakeRequest

  const { hazards, body, snakes } = gameData

  const possibleCollisions = [
	...hazards,
	...body,
	...snakes.map(snake => snake.body)
  ]

  console.log(possibleCollisions);


  response.status(200).send({
    move: 'down'
  })
}
