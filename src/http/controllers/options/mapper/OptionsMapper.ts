import { formatImageUrl } from '@/utils/format-image-url'
import { Option } from '@prisma/client'

export class OptionsMapper {
  static toView(data: Option) {
    return {
      id: data.id,
      name: data.name,
      filename: data.filename,
      createdAt: data.created_at,
      imageUrl: formatImageUrl(data.filename, 'options'),
    }
  }
}
