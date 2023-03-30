import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { ZodError } from 'zod'

import { env } from './config/env'
import { routes } from './http/routes'
import { AppError } from './errors/app-error'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      console.log(error)
      return response.status(400).json({
        message: 'Validation error.',
        issues: error.format(),
      })
    }

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error)
    }

    return response.status(500).json({
      message: 'Internal server error',
    })
  },
)

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}.`)
})
