import { makeListAllUsersUseCase } from '@/use-cases/users/factories/make-list-all-users-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { UsersMapper } from './mapper/UsersMapper'

export async function listAllUsers(request: Request, response: Response) {
  const listAllUsersUseCase = makeListAllUsersUseCase()
  const listAllUsersQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = listAllUsersQuerySchema.parse(request.query)

  const { users, totalCount } = await listAllUsersUseCase.execute({
    page,
  })

  return response.status(200).json({
    users: users.map(UsersMapper.toViewWithRentalsCount),
    totalCount,
  })
}
