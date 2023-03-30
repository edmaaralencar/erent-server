import { Prisma, Rating } from '@prisma/client'

export type RatingWithUser = Prisma.RatingGetPayload<{
  include: {
    user: true
  }
}>

export interface RatingsRepository {
  findManyByPropertyId(propertyId: string): Promise<RatingWithUser[]>
  create(data: Prisma.RatingUncheckedCreateInput): Promise<Rating>
}
