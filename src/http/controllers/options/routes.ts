import { Router } from 'express'
import multer from 'multer'

import { multerConfig } from '../../../config/multer'
import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'
import ensureAdmin from '@/http/middlewares/ensureAdmin'

import { create } from './create'
import { listAll } from './list-all'

export const optionsRoutes = Router()

const upload = multer({
  ...multerConfig,
  limits: { fieldSize: 10 * 1024 * 1024 },
})

optionsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('image'),
  create,
)
optionsRoutes.get('/', listAll)
