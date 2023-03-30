import { verify, sign, Secret } from 'jsonwebtoken'
import { env } from '@/config/env'

export class JwtProvider {
  generate(data: Record<string, string | boolean>): string {
    const token = sign(data, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    })

    return token
  }

  verify(token: string) {
    const payload = verify(token, env.JWT_SECRET as Secret)

    return payload
  }
}
