import { RatingWithUser } from '@/repositories/ratings-repository'

export class RatingsMapper {
  static toView(data: RatingWithUser) {
    return {
      id: data.id,
      value: data.value,
      title: data.title,
      description: data.description,
      user: data.user.name,
      createdAt: data.created_at,
    }
  }
}
