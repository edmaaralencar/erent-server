import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersTokensRepository } from '../users-tokens-repository'

export class PrismaUsersTokensRepository implements UsersTokensRepository {
  async findByToken(token: string) {
    const userToken = await prisma.userToken.findFirst({
      where: {
        token,
      },
    })

    if (!userToken) {
      return null
    }

    return userToken
  }

  async create(data: Prisma.UserTokenUncheckedCreateInput) {
    const token = await prisma.userToken.create({
      data: {
        user_id: data.user_id,
      },
    })

    return token
  }
}
