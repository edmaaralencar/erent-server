import { PropertyWithImagesAndOptions } from '@/repositories/properties-repository'
import { formatImageUrl } from '@/utils/format-image-url'

export class PropertiesMapper {
  static toView(data: PropertyWithImagesAndOptions) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      city: data.city,
      region: data.region,
      dailyPrice: data.daily_price,
      capacity: data.capacity,
      size: data.size,
      bathrooms: data.bathrooms,
      rooms: data.rooms,
      createdAt: data.created_at,
      images: data.images.map((image) => ({
        id: image.id,
        filename: image.filename,
        createdAt: image.created_at,
        url: formatImageUrl(image.filename, 'properties'),
      })),
      options: data.options.map((option) => ({
        id: option.id,
        filename: option.filename,
        name: option.name,
        createdAt: option.created_at,
        url: formatImageUrl(option.filename, 'options'),
      })),
    }
  }
}
