import { JwtProvider } from '@/providers/JwtProvider'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const jwtProvider = new JwtProvider()
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    jwtProvider,
  )

  return authenticateUseCase
}
