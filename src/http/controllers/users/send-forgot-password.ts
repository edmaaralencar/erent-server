import { makeSendForgotPasswordUseCase } from '@/use-cases/users/factories/make-send-forgot-password-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function sendForgotPassword(request: Request, response: Response) {
  const sendForgotPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = sendForgotPasswordBodySchema.parse(request.body)

  const sendForgotPasswordUseCase = makeSendForgotPasswordUseCase()

  await sendForgotPasswordUseCase.execute({ email })

  return response.status(201).json({
    ok: true,
  })
}
