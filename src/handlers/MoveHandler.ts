import { Request, Response } from 'express'
import { BattleSnakeRequest, BattleSnakeResponse } from '../types/requestTypes'


export const handleMove = (request: Request, response: Response) => {
  var gameData = request.body as BattleSnakeRequest

  var possibleMoves = ['up', 'down', 'left', 'right']

  // check if head is going to hit the board width
  // 
  // you.head.x or .y
  // 
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}
