import { hashString, sendUnauthorized, type UserTokenDecoded } from '@/app/utils/utils'
import { connectRedis, redClient } from '@/connection/connection'
import { createMiddleware } from 'hono/factory'
import jwt from 'jsonwebtoken'

export const validateToken = createMiddleware(async (c, next) => {
  const path = c.req.path

  if (path.startsWith('/api/auth') || path === '/api' || path === '/api/version') return await next()

  console.log('Validating token')
  await connectRedis()
  // Parse Authorization token from header
  const token = c.req.header('Authorization')?.split(' ')[1]
  if (!token) return sendUnauthorized(c)

  let decoded: UserTokenDecoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserTokenDecoded
    if (!decoded) return sendUnauthorized(c)
  } catch (error) {
    return sendUnauthorized(c)
  }

  const data = await redClient.hGet(decoded._id, hashString(token))
  if (!data) return sendUnauthorized(c)

  // Return the decoded token
  c.set('user', decoded)
  return await next()
})
