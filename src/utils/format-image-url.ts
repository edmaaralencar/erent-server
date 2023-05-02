import { env } from '@/config/env'

export function formatImageUrl(filename: string, folder: string) {
  if (env.NODE_ENV === 'dev') {
    return `http://localhost:3333/files/${folder}/${filename}`
  } else {
    return `https://aula-youtube-ed-1.s3.amazonaws.com/${filename}`
  }
}
