import { makeFetchRentalsByPropertyIdUseCase } from '@/use-cases/rentals/factories/make-fetch-rentals-by-property-id-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function fetchRentalsByPropertyId(
  request: Request,
  response: Response,
) {
  const fetchRentalsByPropertyIdSchema = z.object({
    property: z.string().uuid(),
  })

  const { property } = fetchRentalsByPropertyIdSchema.parse(request.query)

  const fetchRentalsByPropertyIdUseCase = makeFetchRentalsByPropertyIdUseCase()
  const { rentals } = await fetchRentalsByPropertyIdUseCase.execute({
    propertyId: property,
  })

  return response.status(200).json({ rentals })
}
