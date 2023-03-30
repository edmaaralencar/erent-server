import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { TokenExpiredError } from '@/errors/token-has-expired-error'
import { IMailProvider } from '@/providers/MailProvider/IMailProvider'
import { UsersRepository } from '@/repositories/users-repository'
import { UsersTokensRepository } from '@/repositories/users-tokens-repository'
import { hash } from 'bcryptjs'
import { resolve } from 'path'

interface IRequest {
  token: string
  password: string
}

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token)

    if (!userToken) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const tokenCreatedAt = userToken.created_at
    const twoHoursAgo = Date.now() - 2 * 1000 * 60 * 60

    if (tokenCreatedAt.getTime() < twoHoursAgo) {
      throw new TokenExpiredError()
    }

    user.password_hash = await hash(password, 10)

    await this.usersRepository.save(user)

    const templatePath = resolve(__dirname, 'views', 'reset-password.hbs')

    await this.mailProvider.sendMail({
      to: user.email,
      variables: {
        name: user.name,
        link: 'http://localhost:3000/sign-in',
      },
      subject: 'Confirmação de nova senha',
      file: templatePath,
    })
  }
}
