import { Router } from 'express'
import multer from 'multer'

import { multerConfig } from '../../../config/multer'
import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'

import { createProperty } from './create-property'
import { deleteProperty } from './delete-property'
import { getProperty } from './get-property'
import { listAllProperties } from './list-all-properties'
import { searchMany } from './search-many'
import ensureAdmin from '@/http/middlewares/ensureAdmin'

export const propertiesRoutes = Router()

const upload = multer({
  ...multerConfig,
  limits: { fieldSize: 10 * 1024 * 1024 },
})

propertiesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('image'),
  createProperty,
)
propertiesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteProperty,
)
propertiesRoutes.get('/all', listAllProperties)
propertiesRoutes.get('/', searchMany)
propertiesRoutes.get('/:id', getProperty)
