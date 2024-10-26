import { connectMongo } from '@/connection/connection'
import User from '@/models/User'

export default async function isUsernameAvailable(username: string) {
  await connectMongo()
  const user = await User.findOne({ username }, { _id: 1 })
  console.log(user)
  return user ? false : true
}
