import express from 'express'
const app = express()

import UsersRouter from './users/users.router'
import PetsRouter from './pets/pets.router'



app.use('/users/', UsersRouter)
app.use('/pets/', PetsRouter)

export default app
