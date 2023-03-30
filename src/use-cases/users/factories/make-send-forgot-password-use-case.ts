import { EtherealMailProvider } from '@/providers/MailProvider/implementations/EtherealMailProvider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaUsersTokensRepository } from '@/repositories/prisma/prisma-users-tokens-repository'
import { SendForgotPasswordUseCase } from '../send-forgot-password'

export function makeSendForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usersTokensRepository = new PrismaUsersTokensRepository()
  const mailProvider = new EtherealMailProvider()

  const sendForgotPasswordUseCase = new SendForgotPasswordUseCase(
    usersRepository,
    usersTokensRepository,
    mailProvider,
  )

  return sendForgotPasswordUseCase
}
