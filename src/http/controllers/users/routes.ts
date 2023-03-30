import { Router } from 'express'
import multer from 'multer'

import { multerConfig } from '@/config/multer'

import { ensureAuthenticated } from '@/http/middlewares/ensureAuthenticated'
import { authenticate } from './authenticate'
import { getUserProfile } from './get-user-profile'
import { register } from './register'
import { updateUserAvatar } from './update-user-avatar'
import { sendForgotPassword } from './send-forgot-password'
import { resetPassword } from './reset-password'

export const usersRoutes = Router()

const upload = multer({
  ...multerConfig,
  limits: { fieldSize: 10 * 1024 * 1024 },
})

usersRoutes.post('/', register)
usersRoutes.post('/forgot-password', sendForgotPassword)
usersRoutes.post('/reset-password', resetPassword)
usersRoutes.post('/sessions', authenticate)
usersRoutes.get('/me', ensureAuthenticated, getUserProfile)
usersRoutes.put(
  '/avatar',
  ensureAuthenticated,
  upload.single('image'),
  updateUserAvatar,
)
