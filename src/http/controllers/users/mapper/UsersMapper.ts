import { formatImageUrl } from '@/utils/format-image-url'
import { User } from '@prisma/client'

export class UsersMapper {
  static toView(data: User) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar ? formatImageUrl(data.avatar, 'users') : null,
      isAdmin: data.isAdmin,
    }
  }
}
