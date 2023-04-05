import { UserWithRentals } from '@/repositories/users-repository'
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

  static toViewWithRentalsCount(data: UserWithRentals) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.isAdmin ? 'Admin' : 'Usuário',
      rentals: data.rentals.length,
      avatar: data.avatar ? formatImageUrl(data.avatar, 'users') : null,
    }
  }
}
