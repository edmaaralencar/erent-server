import { Property, Prisma } from '@prisma/client'

export type PropertyWithImagesAndOptions = Prisma.PropertyGetPayload<{
  include: {
    images: true
    options: true
    ratings: true
  }
}>

export interface PropertyCreateInput {
  id?: string
  name: string
  description: string
  city: string
  region: string
  daily_price: number
  rooms: number
  bathrooms: number
  size: number
  capacity: number
  created_at?: Date | string
  images: Array<{
    filename: string
  }>
  options: Array<{
    id: string
  }>
}

export interface FindManyByFilterParams {
  dailyPrice: number
  rooms: number
  region: string
  page: number
}

export type CountWithFiltersParams = Omit<FindManyByFilterParams, 'page'>

export interface PropertiesRepository {
  findMany(page: number): Promise<PropertyWithImagesAndOptions[]>
  findById(id: string): Promise<PropertyWithImagesAndOptions | null>
  findManyByFilter(
    data: FindManyByFilterParams,
  ): Promise<PropertyWithImagesAndOptions[]>
  delete(id: string): Promise<void>
  count(): Promise<number>
  countWithFilters(data: CountWithFiltersParams): Promise<number | undefined>
  create(data: PropertyCreateInput): Promise<Property>
}
