import { testClient } from '@/app/rpc/honoClient'
import { describe, expect, test } from 'vitest'

describe('Version', () => {
  test('GET /', async () => {
    const res = await testClient.api.version.$get()
    const body = await res.json()
    expect(res.status).toBe(200)

    console.log(JSON.stringify(body, null, 2))

    expect(body.message).toBe('Version found')
    expect(body.status).toBe(true)

    if (body.data?.version) {
      expect(body.data.version).toBe('1.0.1')
      expect(body.data.date).toBe('2024-10-07T00:00:00.000Z')
      expect(body.data.features).toEqual(['New Feature 1', 'New Feature 2'])
    }
  })
})
