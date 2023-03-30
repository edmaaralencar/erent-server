import { Router } from 'express'

import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'

import { create } from './create'
import { fetchRatingsByPropertyId } from './fetch-by-property-id'

export const ratingsRouter = Router()

ratingsRouter.post('/', ensureAuthenticated, create)
ratingsRouter.get('/:id', fetchRatingsByPropertyId)
