import { Request, Response } from 'express'


export const handleStart = (request: Request, response: Response) => {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}
