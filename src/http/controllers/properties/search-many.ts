import { makeSearchManyUseCase } from '@/use-cases/properties/factories/make-search-many-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'
import { PropertiesMapper } from './mapper/PropertiesMapper'

export async function searchMany(request: Request, response: Response) {
  const searchManyUseCase = makeSearchManyUseCase()
  const searchManyQuerySchema = z.object({
    page: z.coerce.number().default(1),
    rooms: z.coerce.number().default(0),
    dailyPrice: z.coerce.number().default(0),
    region: z.coerce.string().default(''),
  })

  const { page, rooms, dailyPrice, region } = searchManyQuerySchema.parse(
    request.query,
  )

  const { properties, totalCount } = await searchManyUseCase.execute({
    page,
    rooms,
    dailyPrice,
    region,
  })

  return response.status(200).json({
    properties: properties.map(PropertiesMapper.toView),
    totalCount,
  })
}
