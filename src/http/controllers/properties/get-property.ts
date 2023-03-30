import { makeGetPropertyUseCase } from '@/use-cases/properties/factories/make-get-property-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { PropertiesMapper } from './mapper/PropertiesMapper'

export async function getProperty(request: Request, response: Response) {
  const getPropertyParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPropertyParamsSchema.parse(request.params)

  const getPropertyUseCase = makeGetPropertyUseCase()

  const { property } = await getPropertyUseCase.execute({ id })

  return response.status(200).json({
    property: PropertiesMapper.toView(property),
  })
}
