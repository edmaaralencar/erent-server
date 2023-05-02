import { makeDeleteOptionUseCase } from '@/use-cases/options/factories/make-delete-option-use-cas'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deleteOption(request: Request, response: Response) {
  const deleteOptionSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteOptionSchema.parse(request.params)

  const deleteOptionUsecase = makeDeleteOptionUseCase()

  await deleteOptionUsecase.execute({
    id,
  })

  return response.status(200).json({
    ok: true,
  })
}
