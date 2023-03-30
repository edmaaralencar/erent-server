import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { SearchManyUseCase } from '../search-many'

export function makeSearchManyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const searchManyUseCase = new SearchManyUseCase(propertiesRepository)

  return searchManyUseCase
}
