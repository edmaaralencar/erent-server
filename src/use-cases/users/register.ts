import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface IRequest {
  email: string
  name: string
  password: string
}

interface IResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, name, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 10)

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}
