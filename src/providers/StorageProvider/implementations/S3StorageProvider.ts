import { IStorageProvider } from '../IStorageProvider'

import aws, { S3 } from 'aws-sdk'
import path from 'path'
import mime from 'mime'
import fs from 'fs'

import { multerConfig } from '../../../config/multer'

export class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    })
  }

  async save(filename: string, _: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename)

    const ContentType = mime.getType(originalPath)

    if (!ContentType) {
      throw new Error('File not found.')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    this.client
      .putObject({
        Bucket: 'erent-client-images',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise()

    fs.promises.unlink(originalPath)
  }

  async delete(filename: string, _: string): Promise<void> {
    this.client
      .deleteObject({
        Bucket: 'erent-client-images',
        Key: filename,
      })
      .promise()
  }
}
