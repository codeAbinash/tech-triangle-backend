import User from '@/models/User'
import { Hono } from 'hono'

interface User {
  _id: string
  name: string
  username: string
  email: string
  password: string
  isAdmin: boolean
  otp: string
  lastOtpSent: Date
  otpAttempts: number
  resendOtpCount: number
  lastResendOtp: null
  isVerified: boolean
  isBanned: boolean
  __v: number
}

const getAllUsers = new Hono().post('/', async (c) => {
  const allUsers = (await User.find({})) as User[]

  return c.json({
    message: 'Hello from getAllUsers',
    status: true,
    data: allUsers,
  })
})

export default getAllUsers
