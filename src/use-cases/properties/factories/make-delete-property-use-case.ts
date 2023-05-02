import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { DeletePropertyUseCase } from '../delete-property'
import { S3StorageProvider } from '@/providers/StorageProvider/implementations/S3StorageProvider'

export function makeDeletePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const storageProvider = new S3StorageProvider()

  const deletePropertyUseCase = new DeletePropertyUseCase(
    propertiesRepository,
    storageProvider,
  )

  return deletePropertyUseCase
}
