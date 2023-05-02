import { PrismaOptionsRepository } from '@/repositories/prisma/prisma-options-repository'
import { S3StorageProvider } from '@/providers/StorageProvider/implementations/S3StorageProvider'
import { DeleteOptionUseCase } from '../delete-option'

export function makeDeleteOptionUseCase() {
  const optionsRepository = new PrismaOptionsRepository()
  const storageProvider = new S3StorageProvider()
  const deleteOptionUseCase = new DeleteOptionUseCase(
    optionsRepository,
    storageProvider,
  )

  return deleteOptionUseCase
}
