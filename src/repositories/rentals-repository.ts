import { Prisma, Rental } from '@prisma/client'

export interface FindByDataParams {
  check_in: Date
  checkout: Date
  property_id: string
}

export type RentalWithProperty = Prisma.RentalGetPayload<{
  include: {
    property: {
      include: {
        images: true
      }
    }
  }
}>

export type RentalWithPropertyAndUser = Prisma.RentalGetPayload<{
  include: {
    property: true
    user: true
  }
}>

export interface RentalsRepository {
  findMany(page: number): Promise<RentalWithPropertyAndUser[]>
  findByData(data: FindByDataParams): Promise<Rental | null>
  findManyByUserId(userId: string): Promise<RentalWithProperty[]>
  findManyByPropertyId(propertyId: string): Promise<Rental[]>
  findByPaymentIntentId(
    paymentIntentId: string,
  ): Promise<RentalWithProperty | null>
  findManyByPropertyIdAndUserId(
    propertyId: string,
    userId: string,
  ): Promise<Rental[]>
  create(data: Prisma.RentalUncheckedCreateInput): Promise<Rental>
  count(): Promise<number>
}
