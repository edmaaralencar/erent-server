import { makeCreatePaymentIntentUseCase } from '@/use-cases/rentals/factories/make-create-payment-intent-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createPaymentIntent(
  request: Request,
  response: Response,
) {
  const createRentalSchema = z.object({
    property_id: z.string().uuid(),
    check_in: z.coerce.date(),
    checkout: z.coerce.date(),
  })

  const { property_id, check_in, checkout } = createRentalSchema.parse(
    request.body,
  )

  const createPaymentIntentUseCase = makeCreatePaymentIntentUseCase()
  const { paymentIntent } = await createPaymentIntentUseCase.execute({
    checkout,
    checkIn: check_in,
    propertyId: property_id,
  })

  return response.status(200).json({ paymentIntent })
}
