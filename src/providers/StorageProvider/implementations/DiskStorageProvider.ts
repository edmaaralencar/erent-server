import { IStorageProvider } from '../IStorageProvider'
import fs from 'fs'
import path from 'path'
import { multerConfig } from '../../../config/multer'

export class DiskStorageProvider implements IStorageProvider {
  async save(filename: string, folder: string): Promise<void> {
    const uploadFolder = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      `uploads/${folder}`,
    )

    const originalPath = path.resolve(multerConfig.directory, filename)
    const uploadPath = path.resolve(uploadFolder, filename)

    await fs.promises.rename(originalPath, uploadPath)
  }

  async delete(filename: string, folder: string): Promise<void> {
    const uploadFolder = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      `uploads/${folder}`,
    )

    const originalPath = path.resolve(uploadFolder, filename)

    try {
      await fs.promises.stat(originalPath)
    } catch {
      return
    }
    await fs.promises.unlink(originalPath)
  }
}
