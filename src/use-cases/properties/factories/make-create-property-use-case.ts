import { DiskStorageProvider } from '@/providers/StorageProvider/implementations/DiskStorageProvider'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { CreatePropertyUseCase } from '../create-property'

export function makeCreatePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const storageProvider = new DiskStorageProvider()
  const createPropertyUseCase = new CreatePropertyUseCase(
    propertiesRepository,
    storageProvider,
  )

  return createPropertyUseCase
}
