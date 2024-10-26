import { hashString } from '@/app/utils/utils'
import { connectMongo, connectRedis, redClient } from '@/connection/connection'
import User from '@/models/User'
import { loginZodValidator } from '@/zod/auth'
import { validationError } from '@api/utils/validation'
import { zValidator } from '@hono/zod-validator'
import bcrypt from 'bcryptjs'
import { Hono } from 'hono'
import jwt from 'jsonwebtoken'

const login = new Hono().post('/', zValidator('form', loginZodValidator, validationError), async (c) => {
  await Promise.all([connectMongo(), connectRedis()])
  const { username, password, deviceName, deviceOs } = c.req.valid('form')


  

  // Check if user exists
  const user = await User.findOne(
    { $or: [{ username: username }, { email: username }] },
    { password: 1, isVerified: 1 },
  )

  // If user does not exist
  if (!user) {
    return c.json({
      message: 'User not found',
      status: false,
      verificationRequired: false,
      data: null,
    })
  }

  const isCorrect = await bcrypt.compare(password, user.password)
  console.log('isCorrect', isCorrect)

  // Check if the user password is correct
  if (!isCorrect) {
    return c.json({
      message: 'Wrong password',
      status: false,
      verificationRequired: false,
      data: null,
    })
  }

  // Check if the user is verified
  if (!user.isVerified) {
    return c.json({
      message: 'User not verified',
      status: false,
      verificationRequired: true,
      data: null,
    })
  }

  // Create a token for the user

  const tokenData = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
  }

  const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
    expiresIn: '1y',
  })

  console.log(deviceName, deviceOs)

  const deviceData: Device = {
    time: Date.now(),
    name: deviceName || c.req.header('User-Agent') || 'Unknown',
    os: deviceOs || 'Unknown',
  }

  await redClient.hSet(user._id.toString(), hashString(token), JSON.stringify(deviceData))

  return c.json({
    message: 'Login',
    status: true,
    data: { token },
    verificationRequired: false,
  })
})

export type Device = {
  time: number
  name: string
  os: string
}

export default login
