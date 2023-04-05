import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findMany(page: number) {
    const users = await prisma.user.findMany({
      include: {
        rentals: true,
      },
      take: 9,
      skip: (page - 1) * 9,
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
    })

    return users
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async count() {
    const totalCount = await prisma.user.count()
    return totalCount
  }

  async save(data: User) {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return user
  }
}
