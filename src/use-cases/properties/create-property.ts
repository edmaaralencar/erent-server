import { IStorageProvider } from '@/providers/StorageProvider/IStorageProvider'
import { PropertiesRepository } from '@/repositories/properties-repository'
import { Property } from '@prisma/client'

interface IRequest {
  name: string
  description: string
  city: string
  region: string
  daily_price: number
  rooms: number
  bathrooms: number
  size: number
  capacity: number
  images: Array<{
    filename: string
  }>
  options: Array<{
    id: string
  }>
}

interface IResponse {
  property: Property | null
}

export class CreatePropertyUseCase {
  constructor(
    private propertiesRepository: PropertiesRepository,
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    name,
    description,
    city,
    region,
    daily_price,
    rooms,
    bathrooms,
    size,
    capacity,
    images,
    options,
  }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.create({
      name,
      description,
      city,
      region,
      daily_price,
      rooms,
      bathrooms,
      size,
      capacity,
      images,
      options,
    })

    for (const image of images) {
      await this.storageProvider.save(image.filename, 'properties')
    }

    return { property }
  }
}
