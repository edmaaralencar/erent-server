import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { PrismaRatingsRepository } from '@/repositories/prisma/prisma-ratings-repository'
import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { CreateRatingUseCase } from '../create-rating'

export function makeCreateRatingUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const ratingsRepository = new PrismaRatingsRepository()
  const rentalsRepository = new PrismaRentalsRepository()
  const createPropertyUseCase = new CreateRatingUseCase(
    ratingsRepository,
    propertiesRepository,
    rentalsRepository,
  )

  return createPropertyUseCase
}
