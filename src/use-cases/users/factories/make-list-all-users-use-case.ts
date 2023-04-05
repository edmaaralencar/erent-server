import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ListAllUsersUseCase } from '../list-all-users'

export function makeListAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const listAllUsersUseCase = new ListAllUsersUseCase(usersRepository)

  return listAllUsersUseCase
}
