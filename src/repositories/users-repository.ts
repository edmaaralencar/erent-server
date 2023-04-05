import { Prisma, User } from '@prisma/client'

export interface UserUpdateData {
  userId: string
  data: Prisma.UserUpdateInput
}

export type UserWithRentals = Prisma.UserGetPayload<{
  include: {
    rentals?: true
  }
}>

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findMany(page: number): Promise<UserWithRentals[]>
  save(data: User): Promise<User>
  create(data: Prisma.UserCreateInput): Promise<User>
  count(): Promise<number>
}
