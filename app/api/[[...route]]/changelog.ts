import { Hono } from 'hono'

const changelog = new Hono().get('/', async (c) => {
  return c.json({
    message: 'Changelog',
    status: true,
  })
})

export default changelog
export type Changelog = typeof changelog
