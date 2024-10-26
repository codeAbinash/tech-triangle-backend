import { hashString, type UserTokenDecoded } from '@/app/utils/utils'
import { redClient } from '@/connection/connection'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { validationError } from '../utils/validation'

declare module 'hono' {
  interface ContextVariableMap {
    user: UserTokenDecoded
  }
}

const deviceIdValidator = z.object({
  device: z.string().length(64),
})

interface Device {
  id: string
  time: number
  name: string | null | undefined
  os: string | null | undefined
}
function parseDevice(device: string): Device | null {
  try {
    return JSON.parse(device) as Device
  } catch (error) {
    return null
  }
}

const devices = new Hono()
  .get('/', async (c) => {
    const user = c.get('user')
    const deviceData = await redClient.hGetAll(user._id)

    const token = c.req.header('Authorization')?.split(' ')[1]
    const hashed = hashString(token as string)

    // Parse the current device
    const currentDevice = parseDevice(deviceData[hashed])
    if (currentDevice) currentDevice.id = hashed

    const devices = Object.keys(deviceData)
      .map((key) => {
        const parsedData = parseDevice(deviceData[key])
        if (!parsedData) return null
        parsedData.id = key
        return parsedData
      })
      .filter((device) => device?.id !== hashed && device !== null && device !== undefined)
      .sort((a, b) => (a && b ? b.time - a.time : 0))

    return c.json({
      status: true,
      data: { devices, currentDevice },
    })
  })
  .post('/delete', zValidator('form', deviceIdValidator, validationError), async (c) => {
    const user = c.get('user')
    const token = c.req.header('Authorization')?.split(' ')[1]
    const hashed = hashString(token as string)
    const { device } = c.req.valid('form')

    if (!device) {
      return c.json({
        status: false,
        message: 'Device not found',
      })
    }

    if (device === hashed) {
      return c.json({
        status: false,
        message: 'Cannot delete current device',
      })
    }

    const data = await redClient.hDel(user._id, device)
    if (!data) {
      return c.json({
        status: false,
        message: 'Device not found',
      })
    }

    return c.json({
      status: true,
      message: 'Device deleted',
    })
  })
  .post('/delete/allOther', async (c) => {
    const user = c.get('user')
    const token = c.req.header('Authorization')?.split(' ')[1] as string

    const currentDevice = await redClient.hGet(user._id, hashString(token))

    await redClient
      .multi()
      .del(user._id)
      .hSet(user._id, hashString(token), currentDevice || '')
      .exec()

    return c.json({
      status: true,
      message: 'All other devices deleted',
    })
  })
  .post('/delete/all', async (c) => {
    const user = c.get('user')
    await redClient.del(user._id)
    return c.json({
      status: true,
      message: 'All devices deleted',
    })
  })

export default devices
