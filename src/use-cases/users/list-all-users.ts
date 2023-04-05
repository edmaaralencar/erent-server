import {
  UsersRepository,
  UserWithRentals,
} from '@/repositories/users-repository'

interface IRequest {
  page: number
}

interface IResponse {
  users: UserWithRentals[]
  totalCount: number
}

export class ListAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page }: IRequest): Promise<IResponse> {
    const totalCount = await this.usersRepository.count()
    const users = await this.usersRepository.findMany(page)

    return {
      users,
      totalCount,
    }
  }
}
