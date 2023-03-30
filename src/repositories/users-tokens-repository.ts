import { Prisma, UserToken } from '@prisma/client'

export interface UsersTokensRepository {
  findByToken(token: string): Promise<UserToken | null>
  create(data: Prisma.UserTokenUncheckedCreateInput): Promise<UserToken>
}
