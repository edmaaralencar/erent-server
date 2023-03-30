import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { ListAllPropertiesUseCase } from '../list-all-properties'

export function makeListAllPropertiesUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const listAllPropertiesUseCase = new ListAllPropertiesUseCase(
    propertiesRepository,
  )

  return listAllPropertiesUseCase
}
