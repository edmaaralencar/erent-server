import { makeCreateRatingUseCase } from '@/use-cases/ratings/factories/make-create-rating-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function create(request: Request, response: Response) {
  const createRatingSchema = z.object({
    propertyId: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    value: z.number(),
  })

  const { propertyId, title, description, value } = createRatingSchema.parse(
    request.body,
  )

  const createRatingUseCase = makeCreateRatingUseCase()

  await createRatingUseCase.execute({
    propertyId,
    userId: request.user.id,
    title,
    description,
    value,
  })

  return response.status(200).json({
    ok: true,
  })
}
