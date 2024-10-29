import { connectMongo } from '@/connection/connection'
import User from '@/models/User'
import { createMiddleware } from 'hono/factory'

export const checkAdmin = createMiddleware(async (c, next) => {
  await connectMongo()
  const user = c.get('user')

  console.log('Check admin middleware ')

  const dbUser = await User.findById(user._id, { isAdmin: 1, _id: 0 })

  if (!dbUser)
    return c.json({
      message: 'User not found',
      status: false,
      data: null,
    })
  else if (dbUser.isAdmin === false)
    return c.json({
      message: 'You are not an admin',
      status: false,
      data: null,
    })
  console.log('ADMIN')
  return await next()
})
