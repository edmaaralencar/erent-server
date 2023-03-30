import { randomUUID } from 'node:crypto'
import {
  CountWithFiltersParams,
  FindManyByFilterParams,
  PropertiesRepository,
  PropertyCreateInput,
  PropertyWithImagesAndOptions,
} from '../properties-repository'

export class InMemoryPropertiesRepository implements PropertiesRepository {
  public items: PropertyWithImagesAndOptions[] = []

  async findManyByFilter(data: FindManyByFilterParams) {
    const properties = this.items.filter(
      (item) =>
        item.daily_price <= data.dailyPrice ||
        item.rooms === data.rooms ||
        item.region === data.region,
    )

    return properties
  }

  async countWithFilters(
    data: CountWithFiltersParams,
  ): Promise<number | undefined> {
    const properties = this.items.filter(
      (item) =>
        item.daily_price <= data.dailyPrice ||
        item.rooms === data.rooms ||
        item.region === data.region,
    )

    return properties.length
  }

  async findMany(page: number) {
    return this.items.slice((page - 1) * 9, page * 9)
  }

  async findById(id: string) {
    const property = this.items.find((item) => item.id === id)

    if (!property) {
      return null
    }

    return property
  }

  async delete(id: string) {
    const propertyIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(propertyIndex, 1)
  }

  async count() {
    return this.items.length
  }

  async create(data: PropertyCreateInput) {
    const propertyId = data.id ?? randomUUID()

    const property = {
      id: propertyId,
      name: data.name,
      description: data.description,
      city: data.city,
      region: data.region,
      daily_price: data.daily_price,
      rooms: data.rooms,
      bathrooms: data.bathrooms,
      size: data.size,
      capacity: data.capacity,
      images: data.images.map((item) => ({
        filename: item.filename,
        id: randomUUID(),
        created_at: new Date(),
        property_id: propertyId,
      })),
      options: data?.options.map((item) => ({
        id: item.id,
        name: 'Cozinha',
        created_at: new Date(),
        filename: 'teste-01.png',
      })),
      created_at: new Date(),
    }

    this.items.push(property)

    return property
  }
}
