import { PrismaRentalsRepository } from '@/repositories/prisma/prisma-rentals-repository'
import { ListAllRentalsUseCase } from '../list-all-rentals'

export function makeListAllRentals() {
  const rentalsRepository = new PrismaRentalsRepository()
  const listAllRentalsUseCase = new ListAllRentalsUseCase(rentalsRepository)

  return listAllRentalsUseCase
}
