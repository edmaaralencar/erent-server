import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-properties-repository'
import { CreatePaymentIntentUseCase } from '../create-payment-intent'

export function makeCreatePaymentIntentUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const createPaymentIntentUseCase = new CreatePaymentIntentUseCase(
    propertiesRepository,
  )

  return createPaymentIntentUseCase
}
