import { Prisma, User } from '@prisma/client'

export interface UserUpdateData {
  userId: string
  data: Prisma.UserUpdateInput
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  save(data: User): Promise<User>
  create(data: Prisma.UserCreateInput): Promise<User>
}
