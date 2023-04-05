import { User, Prisma, Rental } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UsersRepository, UserWithRentals } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] | UserWithRentals[] = []

  async findMany(page: number): Promise<(User & { rentals?: Rental[] })[]> {
    return this.items.slice((page - 1) * 9, page * 9)
  }

  async count(): Promise<number> {
    return this.items.length
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      isAdmin: data.isAdmin ?? false,
      avatar: data.avatar ?? null,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async save(data: User) {
    const indexOfUser = this.items.findIndex((item) => item.id === data.id)

    if (indexOfUser >= 0) {
      this.items[indexOfUser] = data
    }

    return data
  }
}
