import { makeDeletePropertyUseCase } from '@/use-cases/properties/factories/make-delete-property-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function deleteProperty(request: Request, response: Response) {
  const deletePropertyParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deletePropertyParamsSchema.parse(request.params)

  const deletePropertyUseCase = makeDeletePropertyUseCase()

  await deletePropertyUseCase.execute({ id })

  return response.status(200).json({
    ok: true,
  })
}
