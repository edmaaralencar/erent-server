import { makeGetRentalByPaymentIntentId } from '@/use-cases/rentals/factories/make-get-rental-by-id'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function getRentalByPaymentIntentId(
  request: Request,
  response: Response,
) {
  const fetchRentalsByPropertyIdSchema = z.object({
    id: z.string(),
  })

  const { id } = fetchRentalsByPropertyIdSchema.parse(request.params)

  const getRentalByPaymentIntentIdUseCase = makeGetRentalByPaymentIntentId()
  const { rental } = await getRentalByPaymentIntentIdUseCase.execute({
    paymentIntentId: id,
  })

  return response.status(200).json({ rental })
}
