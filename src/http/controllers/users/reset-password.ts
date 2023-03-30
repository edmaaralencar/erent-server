import { makeResetPasswordUseCase } from '@/use-cases/users/factories/make-reset-password-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function resetPassword(request: Request, response: Response) {
  const resetPasswordBodySchema = z.object({
    token: z.string().uuid(),
    password: z.string(),
  })

  const { token, password } = resetPasswordBodySchema.parse(request.body)

  const resetPasswordUseCase = makeResetPasswordUseCase()

  await resetPasswordUseCase.execute({ token, password })

  return response.status(201).json({
    ok: true,
  })
}
