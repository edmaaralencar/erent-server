import { makeCreatePropertyUseCase } from '@/use-cases/properties/factories/make-create-property-use-case'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function createProperty(request: Request, response: Response) {
  const createPropertySchema = z
    .object({
      name: z.string(),
      description: z.string(),
      city: z.string(),
      region: z.string(),
      daily_price: z.coerce.number(),
      rooms: z.coerce.number(),
      bathrooms: z.coerce.number(),
      size: z.coerce.number(),
      capacity: z.coerce.number(),
      options: z.string(),
    })
    .transform((data) => ({
      ...data,
      options: JSON.parse(data.options).options as { id: string }[],
    }))

  const files = request.files as Express.Multer.File[]

  const images = files.map((file) => ({
    filename: file.filename,
  }))

  const {
    name,
    description,
    city,
    region,
    daily_price,
    rooms,
    bathrooms,
    size,
    capacity,
    options,
  } = createPropertySchema.parse(request.body)

  const createPropertyUseCase = makeCreatePropertyUseCase()

  await createPropertyUseCase.execute({
    name,
    description,
    city,
    region,
    daily_price,
    rooms,
    bathrooms,
    size,
    capacity,
    images,
    options,
  })

  return response.status(200).json({ ok: true })
}
