import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { FetchRentalsByPropertyIdUseCase } from '../fetch-rentals-by-property-id'

export function makeFetchRentalsByPropertyIdUseCase() {
  const rentalsRepository = new PrismaRentalsRepository()
  const fetchRentalsByPropertyIdUseCase = new FetchRentalsByPropertyIdUseCase(
    rentalsRepository,
  )

  return fetchRentalsByPropertyIdUseCase
}
