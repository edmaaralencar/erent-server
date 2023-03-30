import { EtherealMailProvider } from '@/providers/MailProvider/implementations/EtherealMailProvider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaUsersTokensRepository } from '@/repositories/prisma/prisma-users-tokens-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const usersTokensRepository = new PrismaUsersTokensRepository()
  const mailProvider = new EtherealMailProvider()

  const resetPasswordUseCase = new ResetPasswordUseCase(
    usersRepository,
    usersTokensRepository,
    mailProvider,
  )

  return resetPasswordUseCase
}
