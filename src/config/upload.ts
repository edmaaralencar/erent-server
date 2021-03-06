import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp')

export default {
  directory: uploadFolder,
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')

      const fileName = `${fileHash}-${file.originalname}`

      callback(null, fileName)
    }
  })
}
