import { Request, Response } from 'express'


export const handleIndex = (request: Request, response: Response) => {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'korlando7',
    color: '#81c784',
    head: 'tongue',
    tail: 'bolt'
  }
  response.status(200).json(battlesnakeInfo)
}

