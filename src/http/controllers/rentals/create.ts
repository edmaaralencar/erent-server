import { makeCreateRentalUseCase } from '@/use-cases/rentals/factories/make-create-rental-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function create(request: Request, response: Response) {
  const createRentalSchema = z.object({
    property_id: z.string().uuid(),
    check_in: z.coerce.date(),
    checkout: z.coerce.date(),
    payment_intent_id: z.string(),
    status: z.string(),
    amount: z.number(),
  })

  const { id } = request.user

  const { property_id, check_in, checkout, payment_intent_id, status, amount } =
    createRentalSchema.parse(request.body)

  const createRentalUseCase = makeCreateRentalUseCase()
  const { rental } = await createRentalUseCase.execute({
    checkout,
    checkIn: check_in,
    userId: id,
    propertyId: property_id,
    paymentIntentId: payment_intent_id,
    status,
    amount,
  })

  return response.status(200).json({ rental })
}
