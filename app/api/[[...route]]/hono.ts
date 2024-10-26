import { Hono } from 'hono'

export const hono = new Hono().basePath('/api')
export type HonoApp = typeof hono
