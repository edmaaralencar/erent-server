import { AppError } from '@/errors/app-error'
import { JwtProvider } from '@/providers/JwtProvider'
import { NextFunction, Request, Response } from 'express'

interface ITokenPayload {
  id: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token not found.', 401)
  }

  const [, token] = authHeader?.split(' ')

  try {
    const jwtProvider = new JwtProvider()

    const { id } = jwtProvider.verify(token) as ITokenPayload

    request.user = {
      id,
    }

    return next()
    // next()
  } catch (error) {
    throw new AppError('Invalid token.', 498)
  }
}
