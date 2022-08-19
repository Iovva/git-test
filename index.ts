import express, { Request, Response } from 'express'
import * as swaggerJson from './dist/swagger.json'
import * as swaggerUI from 'swagger-ui-express'
import Modules from './modules'
import 'dotenv/config'

const app = express()

import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1/db').then(() => console.log("Connected to the database!"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(['/docs'], swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.use('/api/v1', Modules)

app.get('/health', (_req: Request, res: Response) => {
  res.send('Healthy')
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
