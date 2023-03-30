import { makeCreateOptionUseCase } from '@/use-cases/options/factories/make-create-option-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function create(request: Request, response: Response) {
  const createOptionSchema = z.object({
    name: z.string(),
  })

  const file = request.file as Express.Multer.File

  const { name } = createOptionSchema.parse(request.body)

  const createOptionUseCase = makeCreateOptionUseCase()

  await createOptionUseCase.execute({
    name,
    filename: file.filename,
  })

  return response.status(200).json({
    ok: true,
  })
}
