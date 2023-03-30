import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'
import { formatImageUrl } from '@/utils/format-image-url'

interface IRequest {
  userId: string
}

interface IResponse {
  user: {
    name: string
    avatar: string | null
    email: string
    isAdmin: boolean
  }
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar ? formatImageUrl(user.avatar, 'users') : null,
        isAdmin: user.isAdmin,
      },
    }
  }
}
