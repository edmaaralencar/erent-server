import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryStorageProvider } from '@/providers/StorageProvider/implementations/InMemoryStorageProvider'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserAvatarUseCase } from './update-user-avatar'

let usersRepository: InMemoryUsersRepository
let storageProvider: InMemoryStorageProvider
let sut: UpdateUserAvatarUseCase

describe('Update User Avatar Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    storageProvider = new InMemoryStorageProvider()
    sut = new UpdateUserAvatarUseCase(usersRepository, storageProvider)
  })

  it('should be able to update user avatar', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({ filename: 'avatar', userId: createdUser.id })

    expect(createdUser.avatar).toEqual('avatar')
  })
})
