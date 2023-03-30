import { makeFetchRentalsByUserIdUseCase } from '@/use-cases/rentals/factories/make-fetch-rentals-by-user-id-use-case'
import { Request, Response } from 'express'
import { RentalsMapper } from './mapper/RentalsMapper'

export async function fetchRentalsByUserId(
  request: Request,
  response: Response,
) {
  const fetchRentalsByUserIdUseCase = makeFetchRentalsByUserIdUseCase()
  const { rentals } = await fetchRentalsByUserIdUseCase.execute({
    userId: request.user.id,
  })

  return response
    .status(200)
    .json({ rentals: rentals.map(RentalsMapper.toViewWithProperty) })
}
