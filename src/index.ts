import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { handleIndex } from './handlers/IndexHandler'
import { handleStart } from './handlers/StartHandler'
import { handleMove } from './handlers/MoveHandler'
import { handleEnd } from './handlers/EndHandler'

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))

