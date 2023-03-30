import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { GetPropertyUseCase } from '../get-property'

export function makeGetPropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const getPropertyUseCase = new GetPropertyUseCase(propertiesRepository)

  return getPropertyUseCase
}
