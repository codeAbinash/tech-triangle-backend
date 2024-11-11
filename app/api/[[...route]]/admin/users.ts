import User from '@/models/User'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { validationError } from '../../utils/validation'
import { z } from 'zod'
import { connectRedis, redClient } from '@/connection/connection'

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

const Validation = z.object({
  id: z.string().min(1).max(255),
})

const users = new Hono()
  .post('/all', async (c) => {
    const allUsers = (await User.find({})) as User[]

    return c.json({
      message: 'Hello from getAllUsers',
      status: true,
      data: allUsers,
    })
  })
  .post('/delete', zValidator('form', Validation, validationError), async (c) => {
    connectRedis()
    const id = c.req.valid('form').id
    const data = await User.findByIdAndDelete(id)

    if (!data) {
      return c.json({
        message: 'User not found',
        status: false,
      })
    }

    await redClient.del(id)

    return c.json({
      message: 'User Deleted',
      status: true,
    })
  })

export default users
