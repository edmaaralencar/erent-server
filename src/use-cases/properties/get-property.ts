import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import {
  PropertiesRepository,
  PropertyWithImagesAndOptions,
} from '@/repositories/properties-repository'

interface IRequest {
  id: string
}

interface IResponse {
  property: PropertyWithImagesAndOptions
}

export class GetPropertyUseCase {
  constructor(private propertiesRepository: PropertiesRepository) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.findById(id)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    return {
      property,
    }
  }
}
