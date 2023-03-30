import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { JwtProvider } from '@/providers/JwtProvider'
import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: {
    name: string
    avatar: string | null
    email: string
    isAdmin: boolean
  }
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtProvider: JwtProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordAMatch = await compare(password, user.password_hash)

    if (!isPasswordAMatch) {
      throw new InvalidCredentialsError()
    }

    const token = this.jwtProvider.generate({
      id: user.id,
      isAdmin: user.isAdmin,
    })

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    }
  }
}
