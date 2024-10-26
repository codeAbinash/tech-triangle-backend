import { connectMongo } from '@/connection/connection'
import User from '@/models/User'
import { validationError } from '@api/utils/validation'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { sendEmail } from '@/mail/mailer'
import { generateOTP } from '@/app/utils/utils'
import { signupZodValidator } from '@/zod/auth'



const signup = new Hono().post('/', zValidator('form', signupZodValidator, validationError), async (c) => {
  await connectMongo()
  const { username, password, email, name } = c.req.valid('form')

  console.log({ username, password, email, name })

  // Step 1 : Check if user exists, check if there is already user with same email or username
  const user = await User.findOne({ $or: [{ username }, { email }] })
  if (user) {
    return c.json({
      message: 'User already exists with this email or username',
      status: false,
    })
  }

  // Step 2 : Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const otp = generateOTP()

  console.log(otp)

  // Step 3: Send verification email
  if (process.env.NODE_ENV === 'production') {
    try {
      await sendEmail({
        to: email,
        subject: 'OTP Verification',
        html: `<h1>Hi ${name}, Welcome to Tech Triangle.</h1>
              <p>Your OTP is ${otp}</p>
              <p>Use this OTP to verify your account. This OTP will expire in 10 minutes.</p>
      `,
      })
    } catch (error) {
      console.log(error)
      return c.json({
        message: 'Something went wrong while sending OTP',
        status: false,
      })
    }
  }

  // Step 4: Create user
  await User.create({
    name,
    email,
    username,
    password: hashedPassword,
    otp,
    lastOtpSent: new Date(),
  })

  // Step 5 : Return response
  return c.json({
    message: 'OTP sent to your email',
    status: true,
  })
})

export default signup
// export const loginC = hc<typeof login>(api(''))
// Parse Authorization token from header
// const token = c.req.header('Authorization')
// console.log(token)
