import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { CreateRentalUseCase } from '../create-rental'

export function makeCreateRentalUseCase() {
  const rentalsRepository = new PrismaRentalsRepository()
  const propertiesRepository = new PrismaPropertiesRepository()
  const createRentalUseCase = new CreateRentalUseCase(
    rentalsRepository,
    propertiesRepository,
  )

  return createRentalUseCase
}
