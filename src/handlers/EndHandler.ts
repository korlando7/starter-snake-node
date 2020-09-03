import { Request, Response } from 'express'


export const handleEnd = (request: Request, response: Response) => {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
