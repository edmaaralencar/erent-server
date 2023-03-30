import { makeListAllPropertiesUseCase } from '@/use-cases/properties/factories/make-list-all-properties-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { PropertiesMapper } from './mapper/PropertiesMapper'

export async function listAllProperties(request: Request, response: Response) {
  const listAllPropertiesUseCase = makeListAllPropertiesUseCase()
  const listAllPropertiesQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = listAllPropertiesQuerySchema.parse(request.query)

  const { properties, totalCount } = await listAllPropertiesUseCase.execute({
    page,
  })

  return response.status(200).json({
    properties: properties.map(PropertiesMapper.toView),
    totalCount,
  })
}
