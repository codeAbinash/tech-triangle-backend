import { testClient } from '@/app/rpc/honoClient'
import { describe, expect, test } from 'vitest'

describe('Route', () => {
  test('GET /', async () => {
    const res = await testClient.api.$get()
    const body = await res.json()
    console.log(body)
    expect(res.status).toBe(200)
    expect(body.message).toBe('Hello from hono')
    expect(body.status).toBe(true)
  })
})
