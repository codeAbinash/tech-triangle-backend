import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import './globals.css'
import './index.css'
import ReactQueryProvider from './utils/providers/ReactQueryProvider'
import NavigationCheck from './NavigationCheck'

export const metadata: Metadata = {
  title: 'Tech Triangle',
  description: 'A collection of tools - Technology Innovations Experiment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={`lexend antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <NavigationCheck>{children}</NavigationCheck>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
