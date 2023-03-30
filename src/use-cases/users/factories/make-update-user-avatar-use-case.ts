import { DiskStorageProvider } from '@/providers/StorageProvider/implementations/DiskStorageProvider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserAvatarUseCase } from '../update-user-avatar'

export function makeUpdateUserAvatarUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const storageProvider = new DiskStorageProvider()
  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
    usersRepository,
    storageProvider,
  )

  return updateUserAvatarUseCase
}
