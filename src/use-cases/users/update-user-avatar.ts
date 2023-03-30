import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { UsersRepository } from '@/repositories/users-repository'
import { formatImageUrl } from '@/utils/format-image-url'

interface IRequest {
  filename: string
  userId: string
}

interface IResponse {
  avatar: string
}

export class UpdateUserAvatarUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ filename, userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'users')
    }

    user.avatar = filename

    await this.usersRepository.save(user)
    await this.storageProvider.save(filename, 'users')

    return {
      avatar: formatImageUrl(filename, 'users'),
    }
  }
}
