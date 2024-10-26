import isUsernameAvailable from '@/handlers/username/isUsernameAvailable'
import { usernameStatusZodValidator } from '@/zod/auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { validationError } from '../../utils/validation'

const usernameStatus = new Hono().post(
  '/',
  zValidator('form', usernameStatusZodValidator, validationError),
  async (c) => {
    const { username } = c.req.valid('form')
    const status = await isUsernameAvailable(username)
    return c.json({
      status: status,
      message: status ? 'Username is available' : 'Username is not available',
      username,
    })
  },
)

export default usernameStatus
