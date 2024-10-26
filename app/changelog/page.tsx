'use client'

import Nav from '@/components/Nav'
import React, { useEffect } from 'react'
import client from '../rpc/honoClient'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

async function loadChangelog() {
  const res = await client.api.changelog.$get()
  const data = await res.json()
  return data
}

function Changelog() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: loadChangelog,
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return (
    <>
      <Nav />
      <div className='flex min-h-screen flex-col items-center justify-center gap-10'>
        <div className='pt-20'>
          {isPending ? (
            <p>Loading...</p>
          ) : (
            <pre className='mono rounded-lg bg-secondary/30 px-4 py-3'>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          )}
        </div>
        <Button onClick={() => mutate()} className='mt-4'>
          Refresh
        </Button>
      </div>
    </>
  )
}

export default Changelog
