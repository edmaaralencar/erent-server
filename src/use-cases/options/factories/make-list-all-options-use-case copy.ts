import { PrismaOptionsRepository } from '@/repositories/prisma/prisma-options-repository'
import { ListAllOptionsUseCase } from '../list-all-options'

export function makeListAllOptionsUseCase() {
  const optionsRepository = new PrismaOptionsRepository()
  const listAllOptionsUseCase = new ListAllOptionsUseCase(optionsRepository)

  return listAllOptionsUseCase
}
