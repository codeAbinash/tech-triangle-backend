'use client'
import client from '@/app/rpc/honoClient'
import Nav from '@/components/Nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: () => client?.api.auth.signup.$post({ form: { password, name, email, username } }),
    onSuccess: async (res) => {
      const data = await res.json()
      console.log(data)
      if (!data.status) {
        alert(data.message)
      }
    },
  })

  return (
    <div className='min-h-screen bg-background dark:text-white'>
      <Nav />
      <div className='flex min-h-screen flex-row-reverse pt-10'>
        <div className='flex w-full items-center justify-center p-8 lg:w-1/2'>
          <div className='flex w-full max-w-lg flex-col gap-8'>
            <div>
              <h1 className='text-3xl font-bold'>Signup Now to get started!</h1>
              <p className='mt-2 text-sm opacity-70'>
                Signup now to get access to all of our features and start managing your workforce with ease
              </p>
            </div>
            <div className='flex flex-col-reverse gap-8 md:flex-col'>
              <div className='flex flex-col-reverse gap-8 md:flex-col'>
                <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
                  <Button variant='outline' className='w-full gap-3'>
                    <img
                      src='https://img.icons8.com/material-rounded/24/google-logo.png'
                      alt='Google'
                      className='size-5 dark:invert'
                    />
                    Signup with Google
                  </Button>
                  <Button variant='outline' className='w-full gap-3'>
                    <GitHubLogoIcon className='h-5 w-5' fill='currentColor' />
                    Signup with Github
                  </Button>
                </div>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-300 dark:border-zinc-600' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='0 bg-background px-2 text-gray-500 dark:text-zinc-400'>or</span>
                  </div>
                </div>
              </div>
              <form className='flex flex-col gap-4' action={() => mutate()}>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='e.g. John Doe'
                    className='mt-1.5'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='e.g. johnDoe@abc.com'
                    required
                    className='mt-1.5'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor='username'>Username</Label>
                  <Input
                    id='username'
                    type='text'
                    placeholder='e.g. johnDoe@abc.com'
                    required
                    className='mt-1.5'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='password'>Password</Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    placeholder='min 8 chars'
                    required
                    className='mt-1.5'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className='mt-2 flex justify-end'>
                    <Link className='text-sm text-blue-600 hover:underline dark:text-blue-400' href='#'>
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <p className='text-sm'>
                    By Logging in, you agree to our{' '}
                    <Link className='text-blue-600 hover:underline dark:text-blue-400' href='#'>
                      Terms of Service
                    </Link>
                    .
                  </p>
                </div>
                <Button className='w-full' type='submit' disabled={isPending}>
                  {isPending ? 'Loading...' : 'Signup'}
                </Button>
              </form>
            </div>
            <p className='text-center text-sm'>
              Have an account?{' '}
              <Link className='font-medium text-blue-600 hover:underline dark:text-blue-400' href='#'>
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right column - Product showcase */}
        <RightSide />
      </div>
    </div>
  )
}

function RightSide() {
  return (
    <div className='hidden w-1/2 p-5 lg:flex'>
      <div className='flex flex-1 flex-col justify-between rounded-3xl p-10'>
        <div>
          <h2 className='text-3xl font-bold'>The simplest way to manage your workforce</h2>
          <p className='mt-2'>
            With our simple and easy to use dashboard, you can manage your workforce with ease. Get started today and
            see the difference.
          </p>
        </div>
        <div className='relative mt-8 flex flex-1 items-center justify-center'>
          <img
            src='/icon_round.svg'
            alt='Dashboard preview'
            className='w-7h-72 duration-8000 h-72 animate-spin object-contain ease-linear'
          />
        </div>
        <div className='mt-8 flex items-center justify-start gap-10 text-sm opacity-80'>
          <a href='/'>Github</a>
          <a href='/'>Source Code</a>
          <a href='/'>Download APK</a>
          <a href='/'>Backend API</a>
        </div>
      </div>
    </div>
  )
}
