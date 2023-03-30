import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { FetchRentalsByUserIdUseCase } from '../fetch-rentals-by-user-id'

export function makeFetchRentalsByUserIdUseCase() {
  const rentalsRepository = new PrismaRentalsRepository()
  const fetchRentalsByUserIdUseCase = new FetchRentalsByUserIdUseCase(
    rentalsRepository,
  )

  return fetchRentalsByUserIdUseCase
}
