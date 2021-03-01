/* eslint-disable no-unused-vars */
import { config } from 'dotenv'

import express, { Request, Response, NextFunction } from 'express'

import cors from 'cors'

import mongoose from 'mongoose'

import routes from './routes'

import swaggerUi from 'swagger-ui-express'

import * as swaggerDocument from '@config/swagger.json'

config()

class App {
    public express: express.Application

    constructor () {
      this.express = express()

      this.middleware()
      this.database()
      this.routes()
    }

    private middleware (): void {
      this.express.use(cors())
      this.express.use(express.json())
    }

    private database (): void {
      mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    }

    private routes (): void {
      this.express.use(routes)
      this.express.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
      this.express.use((req: Request, res: Response, next: NextFunction) => {
        return res.redirect('/documentation')
      })
    }
}

export default new App().express
