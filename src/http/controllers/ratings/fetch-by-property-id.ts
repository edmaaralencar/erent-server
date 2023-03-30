import { makeFetchRatingsByPropertyIdUseCase } from '@/use-cases/ratings/factories/make-fetch-ratings-by-property-id-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { RatingsMapper } from './mapper/RatingsMapper'

export async function fetchRatingsByPropertyId(
  request: Request,
  response: Response,
) {
  const fetchRatingsByPropertyIdQuerySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = fetchRatingsByPropertyIdQuerySchema.parse(request.params)

  const fetchRatingsByPropertyIdUseCase = makeFetchRatingsByPropertyIdUseCase()
  const { ratings } = await fetchRatingsByPropertyIdUseCase.execute({
    propertyId: id,
  })

  return response.status(200).json({
    ratings: ratings.map(RatingsMapper.toView),
  })
}
