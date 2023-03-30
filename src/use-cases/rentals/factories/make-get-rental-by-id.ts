import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { GetRentalByPaymentIntentIdUseCase } from '../get-rental-by-id'

export function makeGetRentalByPaymentIntentId() {
  const rentalsRepository = new PrismaRentalsRepository()
  const getRentalByPaymentIntentIdUseCase =
    new GetRentalByPaymentIntentIdUseCase(rentalsRepository)

  return getRentalByPaymentIntentIdUseCase
}
