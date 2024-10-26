import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000)
}

export function sendUnauthorized(c: any) {
  return c.json({
    message: 'Unauthorized',
    status: false,
  })
}

export type UserTokenDecoded = jwt.JwtPayload & {
  _id: string
}

export function hashString(inputString: string) {
  return crypto.createHash('sha256').update(inputString).digest('hex')
}

type KeyType = 'token' | 'user'
export function ls(key: KeyType, value?: string) {
  if (value) {
    localStorage.setItem(key, value)
  }
  return localStorage.getItem(key)
}
