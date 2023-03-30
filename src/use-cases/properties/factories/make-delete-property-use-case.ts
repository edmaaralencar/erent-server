import { DiskStorageProvider } from '@/providers/StorageProvider/implementations/DiskStorageProvider'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { DeletePropertyUseCase } from '../delete-property'

export function makeDeletePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const storageProvider = new DiskStorageProvider()

  const deletePropertyUseCase = new DeletePropertyUseCase(
    propertiesRepository,
    storageProvider,
  )

  return deletePropertyUseCase
}
