import { Router } from 'express'
import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'
import { create } from './create'
import { fetchRentalsByPropertyId } from './fetch-rentals-by-property-id'
import { createPaymentIntent } from './create-payment-intent'
import { getRentalByPaymentIntentId } from './get-by-id'
import { listAll } from './list-all'
import { fetchRentalsByUserId } from './fetch-by-user-id'
import ensureAdmin from '@/http/middlewares/ensureAdmin'

export const rentalsRoutes = Router()

rentalsRoutes.get('/', fetchRentalsByPropertyId)
rentalsRoutes.get('/me', ensureAuthenticated, fetchRentalsByUserId)
rentalsRoutes.get('/all', ensureAuthenticated, ensureAdmin, listAll)
rentalsRoutes.get('/:id', ensureAuthenticated, getRentalByPaymentIntentId)
rentalsRoutes.post('/', ensureAuthenticated, create)
rentalsRoutes.post(
  '/create-payment-intent',
  ensureAuthenticated,
  createPaymentIntent,
)
