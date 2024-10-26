import { hc } from 'hono/client'
import type { AppType } from '@route/route'

// assign the client to a variable to calculate the type when compiling
const client = hc<AppType>('')
export type Client = typeof client

export const hcWithType = (...args: Parameters<typeof hc>): Client => hc<AppType>(...args)
export default hcWithType

// WARNING: DO NOT USE this before compiling
// Instead use ./client.ts to get the client
