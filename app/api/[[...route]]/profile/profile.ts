import { connectMongo } from '@/connection/connection'
import User from '@/models/User'
import { Hono } from 'hono'

const profile = new Hono().get('/', async (c) => {
  await connectMongo()
  const decoded = c.get('user')
  const user = await User.findOne({ _id: decoded._id }, { name: 1, email: 1, _id: 0, isAdmin: 1 })

  return c.json({
    status: true,
    data: {
      name: user.name as string,
      email: user.email as string,
      isAdmin: user.isAdmin as boolean,
    },
  })
})

export default profile
export type Profile = typeof profile
