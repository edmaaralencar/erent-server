import {
  RentalWithProperty,
  RentalWithPropertyAndUser,
} from '@/repositories/rentals-repository'
import { formatImageUrl } from '@/utils/format-image-url'

export class RentalsMapper {
  static toView(data: RentalWithPropertyAndUser) {
    return {
      id: data.id,
      user: data.user.name,
      checkIn: data.check_in,
      checkout: data.checkout,
      total: data.total,
      property: {
        name: data.property.name,
      },
    }
  }

  static toViewWithProperty(data: RentalWithProperty) {
    return {
      id: data.id,
      checkIn: data.check_in,
      checkout: data.checkout,
      total: data.total,
      property: {
        id: data.property_id,
        name: data.property.name,
        image_url: formatImageUrl(
          data.property.images[0].filename,
          'properties',
        ),
      },
    }
  }
}
