import { makeListAllOptionsUseCase } from '@/use-cases/options/factories/make-list-all-options-use-case'
import { Request, Response } from 'express'
import { OptionsMapper } from './mapper/OptionsMapper'

export async function listAll(request: Request, response: Response) {
  const createOptionUseCase = makeListAllOptionsUseCase()

  const { options } = await createOptionUseCase.execute()

  return response.status(200).json({
    options: options.map(OptionsMapper.toView),
  })
}
