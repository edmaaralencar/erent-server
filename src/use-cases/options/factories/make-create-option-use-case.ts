import { PrismaOptionsRepository } from '@/repositories/prisma/prisma-options-repository'
import { CreateOptionUseCase } from '../create-option'
import { S3StorageProvider } from '@/providers/StorageProvider/implementations/S3StorageProvider'

export function makeCreateOptionUseCase() {
  const optionsRepository = new PrismaOptionsRepository()
  const storageProvider = new S3StorageProvider()
  const createOptionUseCase = new CreateOptionUseCase(
    optionsRepository,
    storageProvider,
  )

  return createOptionUseCase
}
