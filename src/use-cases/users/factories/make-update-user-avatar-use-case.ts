import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserAvatarUseCase } from '../update-user-avatar'
import { S3StorageProvider } from '@/providers/StorageProvider/implementations/S3StorageProvider'

export function makeUpdateUserAvatarUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const storageProvider = new S3StorageProvider()
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
    usersRepository,
    storageProvider,
  )

  return updateUserAvatarUseCase
}
