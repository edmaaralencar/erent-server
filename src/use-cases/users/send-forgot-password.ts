import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IMailProvider } from '@/providers/MailProvider/IMailProvider'
import { UsersRepository } from '@/repositories/users-repository'
import { UsersTokensRepository } from '@/repositories/users-tokens-repository'
import { resolve } from 'path'

interface IRequest {
  email: string
}

export class SendForgotPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersTokensRepository: UsersTokensRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userToken = await this.usersTokensRepository.create({
      user_id: user.id,
    })

    const templatePath = resolve(__dirname, 'views', 'forgotPassword.hbs')

    await this.mailProvider.sendMail({
      to: email,
      variables: {
        name: user.name,
        link: `http://localhost:3000/forgot-password?token=${userToken.token}`,
      },
      subject: 'Recuperação de senha',
      file: templatePath,
    })
  }
}
