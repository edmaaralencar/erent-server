import { makeUpdateUserAvatarUseCase } from '@/use-cases/users/factories/make-update-user-avatar-use-case'
import { Request, Response } from 'express'

export async function updateUserAvatar(request: Request, response: Response) {
  const { id } = request.user

  const file = request.file as Express.Multer.File

  const updateUserAvatarUseCase = makeUpdateUserAvatarUseCase()

  const { avatar } = await updateUserAvatarUseCase.execute({
    userId: id,
    filename: file.filename,
  })

  return response.status(200).json({ avatar })
}
