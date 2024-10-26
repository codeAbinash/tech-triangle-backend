import { connectMongo } from '@/connection/connection'
import User from '@/models/User'
import { Hono } from 'hono'

const getAllUsers = new Hono().post('/', async (c) => {
  await connectMongo()
  const user = c.get('user')

  const dbUser = await User.findById(user._id, { isAdmin: 1, _id: 0 })

  if (!dbUser)
    return c.json({
      message: 'User not found',
      status: false,
      data: null,
    })

  console.log(dbUser)

  if (dbUser.isAdmin === false)
    return c.json({
      message: 'You are not an admin',
      status: false,
      data: null,
    })

  const allUsers = (await User.find({}, { name: 1, email: 1, _id: 0 })) as { name: string; email: string }[]

  return c.json({
    message: 'Hello from getAllUsers',
    status: true,
    data: allUsers,
  })
})

export default getAllUsers
