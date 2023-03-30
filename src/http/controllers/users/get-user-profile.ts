import { makeGetUserProfileUseCase } from '@/use-cases/users/factories/make-get-user-profile-use-case'
import { Request, Response } from 'express'

export async function getUserProfile(request: Request, response: Response) {
  const { id } = request.user

  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    userId: id,
  })

  return response.status(200).json({ user })
}
