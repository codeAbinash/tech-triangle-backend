import { Hono } from 'hono'

const updateVersion = new Hono().post('/', async (c) => {
  return c.json({
    message: 'Hello from updateVersion',
    status: true,
    data: null,
  })
})

export default updateVersion
