import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from './config'

import authRouter from './routes/auth-router'
import usuarioRouter from './routes/usuario-router'

const app = express()
app.set('port', config.port || 3000)

//Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Routes
app.use(authRouter)
app.use(usuarioRouter)

export default app