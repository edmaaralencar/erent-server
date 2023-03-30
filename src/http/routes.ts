import { Router } from 'express'

import { optionsRoutes } from './controllers/options/routes'
import { propertiesRoutes } from './controllers/properties/routes'
import { ratingsRouter } from './controllers/ratings/routes'
import { rentalsRoutes } from './controllers/rentals/routes'
import { usersRoutes } from './controllers/users/routes'

export const routes = Router()

routes.use('/properties', propertiesRoutes)
routes.use('/options', optionsRoutes)
routes.use('/users', usersRoutes)
routes.use('/rentals', rentalsRoutes)
routes.use('/ratings', ratingsRouter)
