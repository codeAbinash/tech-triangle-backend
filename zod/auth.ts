import { z } from 'zod'

const username = z
  .string({ required_error: 'Username is required.' })
  .trim()
  .toLowerCase()
  .min(3, 'Username must contain at least 3 characters')
  .max(255, 'Username must contain at most 255 characters')
  .refine((id) => /^[a-zA-Z0-9]*$/.test(id), 'Username must contain only letters and numbers')
  .refine((id) => /[a-zA-Z]/.test(id), 'Username must contain at least one letter')

const password = z
  .string({ required_error: 'Password is required.' })
  .trim()
  .min(3, 'Password must contain at least 3 characters')
  .max(255, 'Password must contain at most 255 characters')

const email = z
  .string({ required_error: 'Email is required.' })
  .trim()
  .toLowerCase()
  .min(5, 'Email must contain at least 5 characters')
  .max(50, 'Email must contain at most 50 characters')
  .refine((e) => /\S+@\S+\.\S+/.test(e), 'Invalid email format')

const name = z
  .string({ required_error: 'Name is required.' })
  .trim()
  .min(3, 'Name must contain at least 3 characters')
  .max(50, 'Name must contain at most 50 characters')
  .refine((n) => /^[a-zA-Z\s]*$/.test(n), 'Name must contain only letters')

const otp = z
  .string({ required_error: 'OTP is required.' })
  .trim()
  .min(6, 'OTP must contain at least 6 characters')
  .max(6, 'OTP must contain at most 6 characters')
  .refine((o) => /^[0-9]*$/.test(o), 'OTP must contain only numbers')

const usernameOrEmail = z
  .string({ required_error: 'Username or email is required.' })
  .trim()
  .min(3, 'Username or email must contain at least 3 characters')
  .max(255, 'Username or email must contain at most 255 characters')

export const loginZodValidator = z.object({
  username: usernameOrEmail,
  password,
  deviceName: z
    .string({ required_error: 'Device name is required.' })
    .trim()
    .min(3, 'Device name must contain at least 3 characters')
    .max(255, 'Device name must contain at most 255 characters'),
  deviceOs: z
    .string({ required_error: 'Device OS is required.' })
    .trim()
    .min(3, 'Device OS must contain at least 3 characters')
    .max(255, 'Device OS must contain at most 255 characters'),
})

export const signupZodValidator = z.object({ name, username, email, password })

export const verifyEmailZodValidator = z.object({ username, otp })

export const usernameStatusZodValidator = z.object({ username })
