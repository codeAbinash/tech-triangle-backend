'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function NavigationCheck({ children }: Readonly<{ children: React.ReactNode }>) {
  const path = usePathname()
  const router = useRouter()

  // useEffect(() => {
  //   const token = ls('token')
  //   console.log('token', token)

  //   if (token) {
  //     if (path === '/login') return router.replace('/')
  //   }

  //   if (!token) {
  //     if (path !== '/login') return router.replace('/login')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [path])

  return <>{children}</>
}
