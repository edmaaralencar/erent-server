import {
  PropertiesRepository,
  PropertyWithImagesAndOptions,
} from '@/repositories/properties-repository'

interface IRequest {
  page: number
}

interface IResponse {
  properties: PropertyWithImagesAndOptions[]
  totalCount: number
}

export class ListAllPropertiesUseCase {
  constructor(private propertiesRepository: PropertiesRepository) {}

  async execute({ page }: IRequest): Promise<IResponse> {
    const totalCount = await this.propertiesRepository.count()
    const properties = await this.propertiesRepository.findMany(page)

    return {
      properties,
      totalCount,
    }
  }
}
