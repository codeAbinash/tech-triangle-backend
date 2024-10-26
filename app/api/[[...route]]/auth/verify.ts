import { verifyEmailZodValidator } from '@/zod/auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { validationError } from '../../utils/validation'
import { connectMongo } from '@/connection/connection'
import User from '@/models/User'

const verify = new Hono().post('/', zValidator('form', verifyEmailZodValidator, validationError), async (c) => {
  await connectMongo()

  const { username, otp } = c.req.valid('form')

  // Check if user exists
  const user = await User.findOne({ $or: [{ username }, { email: username }] }, { otp: 1, isVerified: 1 })

  // if user does not exist
  if (!user) return c.json({ message: 'User does not exist', status: false })

  // Check other security conditions here
  /**
   *
   *
   *
   */

  // if user is already verified
  if (user.isVerified) return c.json({ message: 'User already verified', status: true })

  if (user.otp !== otp) return c.json({ message: 'Invalid OTP', status: false })

  // OTP is correct
  await User.updateOne({ _id: user._id }, { isVerified: true, otp: '' })

  return c.json({ message: 'User verified', status: true })
})

export default verify
