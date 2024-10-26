'use client'

import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import useCountStore from '@/zustand/CountStore'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import client from '../rpc/honoClient'

export default function Dashboard() {
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  const count = useCountStore((state) => state.count)

  const { isPending, mutate, data } = useMutation({
    mutationFn: async () => await (await client.api.profile.$get()).json(),
    mutationKey: ['profile'],
  })

  useEffect(() => {
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Nav />
      <div className='flex min-h-screen flex-col items-center justify-center gap-5 pt-16'>
        <h1 className='text-center text-5xl font-medium'>Welcome to your dashboard</h1>
        <div className='flex items-center justify-center gap-5'>
          <Button onClick={decrement}>Decrement</Button>
          <p className='text-lg'>{count}</p>
          <Button onClick={increment}>Increment</Button>
        </div>
        <pre>
          <code>{isPending ? 'Loading...' : JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}
