import { Request, Response } from 'express'


export const handleIndex = (request: Request, response: Response) => {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'korlando7',
    color: '#888888',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

