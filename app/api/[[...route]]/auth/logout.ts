import { hashString } from '@/app/utils/utils'
import { connectMongo, redClient } from '@/connection/connection'
import { Hono } from 'hono'

const logout = new Hono().post('/', async (c) => {
  await connectMongo()
  const userId = c.get('user')._id.toString()
  const token = c.req.header('Authorization')?.split(' ')[1] || ''
  redClient.hDel(userId, hashString(token))
  return c.json({ message: 'Logout successfully', status: true })
})

export default logout
