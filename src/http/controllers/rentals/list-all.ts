import { makeListAllRentals } from '@/use-cases/rentals/factories/make-list-all-rentals-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { RentalsMapper } from './mapper/RentalsMapper'

export async function listAll(request: Request, response: Response) {
  const listAllRentalsUseCase = makeListAllRentals()
  const listAllPropertiesQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = listAllPropertiesQuerySchema.parse(request.query)

  const { rentals, totalCount } = await listAllRentalsUseCase.execute({
    page,
  })

  return response.status(200).json({
    rentals: rentals.map(RentalsMapper.toView),
    totalCount,
  })
}
