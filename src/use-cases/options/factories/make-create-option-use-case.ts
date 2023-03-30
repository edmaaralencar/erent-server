import { DiskStorageProvider } from '@/providers/StorageProvider/implementations/DiskStorageProvider'
import { PrismaOptionsRepository } from '@/repositories/prisma/prisma-options-repository'
import { CreateOptionUseCase } from '../create-option'

export function makeCreateOptionUseCase() {
  const optionsRepository = new PrismaOptionsRepository()
  const storageProvider = new DiskStorageProvider()
  const createOptionUseCase = new CreateOptionUseCase(
    optionsRepository,
    storageProvider,
  )

  return createOptionUseCase
}
