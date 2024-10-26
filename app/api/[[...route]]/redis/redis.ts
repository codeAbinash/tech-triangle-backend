import { connectRedis, redClient } from '@/connection/connection'
import { Hono } from 'hono'

const redisRoute = new Hono()
  .get('/', async (c) => {
    await connectRedis()
    return c.json({
      message: 'Redis',
      status: true,
    })
  })
  .get('/:key', async (c) => {
    await connectRedis()
    const key = c.req.param('key')
    console.log(key)
    const data = await redClient.get(key)

    let parsed
    try {
      parsed = JSON.parse(data || 'null')
    } catch (error) {
      parsed = data
    }

    return c.json({ message: 'Get Data', data: parsed })
  })
  .get('/:key/:value', async (c) => {
    await connectRedis()
    const key = c.req.param('key')
    const value = c.req.param('value')
    await redClient.set(key, value)

    const lastUpdate = {
      lastUpdate: new Date().getTime(),
      random: Math.random(),
    }

    await redClient.set('lastUpdate', JSON.stringify(lastUpdate))

    return c.json({ message: 'Hello Hono', data: { key, value } })
  })

export default redisRoute
export type Redis = typeof redisRoute
