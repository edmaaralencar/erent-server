import {
  PropertiesRepository,
  PropertyWithImagesAndOptions,
} from '@/repositories/properties-repository'

interface IRequest {
  page: number
  region: string
  rooms: number
  dailyPrice: number
}

interface IResponse {
  properties: PropertyWithImagesAndOptions[]
  totalCount: number
}

export class SearchManyUseCase {
  constructor(private propertiesRepository: PropertiesRepository) {}

  async execute({
    page,
    region,
    rooms,
    dailyPrice,
  }: IRequest): Promise<IResponse> {
    const totalCount = await this.propertiesRepository.count()

    const properties = await this.propertiesRepository.findManyByFilter({
      dailyPrice,
      page,
      rooms,
      region,
    })

    const totalCountWithFilter =
      await this.propertiesRepository.countWithFilters({
        dailyPrice,
        rooms,
        region,
      })

    return {
      properties,
      totalCount:
        (region !== '' || rooms || dailyPrice) && totalCountWithFilter
          ? totalCountWithFilter
          : totalCount,
    }
  }
}
