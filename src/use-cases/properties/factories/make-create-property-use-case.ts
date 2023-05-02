import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { CreatePropertyUseCase } from '../create-property'
import { S3StorageProvider } from '@/providers/StorageProvider/implementations/S3StorageProvider'

export function makeCreatePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const storageProvider = new S3StorageProvider()
  const createPropertyUseCase = new CreatePropertyUseCase(
    propertiesRepository,
    storageProvider,
  )

  return createPropertyUseCase
}
