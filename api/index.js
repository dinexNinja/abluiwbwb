import 'dotenv/config'

import usuarioController from './src/controller/usuarioController.js'
import filmeController from './src/controller/filmeController.js'

import cors from "cors"
import express  from 'express'

const server = express()
server.use(cors())
server.use(express.json())
server.use(usuarioController)
server.use(filmeController)

server.listen(process.env.PORT, 
    () =>console.log(`API CONECTADO NA PORTA ${process.env.PORT}`))