import User from '@/models/User'
import { Hono } from 'hono'

const getAllUsers = new Hono().post('/', async (c) => {
  const allUsers = (await User.find({}, { name: 1, email: 1, _id: 0 })) as { name: string; email: string }[]

  return c.json({
    message: 'Hello from getAllUsers',
    status: true,
    data: allUsers,
  })
})

export default getAllUsers
