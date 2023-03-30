import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { stripe } from '@/lib/stripe'
import { PropertiesRepository } from '@/repositories/properties-repository'
import { calculateDifferenceBetweenDates } from '@/utils/date'
import Stripe from 'stripe'

interface IRequest {
  propertyId: string
  checkIn: Date
  checkout: Date
}

interface IResponse {
  paymentIntent: Stripe.Response<Stripe.PaymentIntent>
}

export class CreatePaymentIntentUseCase {
  constructor(private propertiesRepository: PropertiesRepository) {}

  async execute({
    propertyId,
    checkIn,
    checkout,
  }: IRequest): Promise<IResponse> {
    const property = await this.propertiesRepository.findById(propertyId)

    if (!property) {
      throw new ResourceNotFoundError()
    }

    const total =
      calculateDifferenceBetweenDates(checkIn, checkout) * property.daily_price

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'brl',
      metadata: { property: JSON.stringify(property.id) },
    })

    return {
      paymentIntent,
    }
  }
}
