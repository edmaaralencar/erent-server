import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { PrismaRatingsRepository } from '@/repositories/prisma/prisma-ratings-repository'
import { FetchRatingsByPropertyIdUseCase } from '../fetch-ratings-by-property-id'

export function makeFetchRatingsByPropertyIdUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const ratingsRepository = new PrismaRatingsRepository()
  const fetchRatingsByPropertyIdUseCase = new FetchRatingsByPropertyIdUseCase(
    ratingsRepository,
    propertiesRepository,
  )

  return fetchRatingsByPropertyIdUseCase
}
