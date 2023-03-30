import { makeRegisterUseCase } from '@/use-cases/users/factories/make-register-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function register(request: Request, response: Response) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  await registerUseCase.execute({ name, email, password })

  return response.status(201).json({
    ok: true,
  })
}
