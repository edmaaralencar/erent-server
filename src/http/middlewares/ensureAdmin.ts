import { NextFunction, Request, Response } from 'express'
import { AppError } from '@/errors/app-error'
import { prisma } from '@/lib/prisma'

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user

  const user = await prisma.user.findUnique({ where: { id } })

  if (!user?.isAdmin) {
    throw new AppError('You are unauthorized to access this route.', 403)
  }

  return next()
}
