import Nav from '@/components/Nav'
import { github_latest_release } from '@/utils/constants'
import version, { type Version } from '@route/version'
import { testClient } from 'hono/testing'
import { ChevronDown, DownloadIcon } from 'lucide-react'

const versionClient = testClient<Version>(version)

// export const dynamic = 'force-dynamic'

// Revalidate the page after 5 minutes
// eslint-disable-next-line prefer-const
export let revalidate = 5 * 60 // 5 Minutes

const mockVersionData = {
  data: {
    version: 'v1.0.1',
  },
}

export default async function Home() {
  let version, data

  if (process.env.NODE_ENV === 'production') {
    version = await versionClient.index.$get()
    data = await version.json()
  } else {
    console.log('Using mock data')
    data = mockVersionData
  }

  return (
    <>
      <Nav />
      <TopArea version={data?.data?.version} />
      {/* <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20'>
        <div className='flex items-center justify-center gap-2'></div>
        <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
          <img src='/icon_round.svg' alt='Tech Triangle Logo' className='-mb-8 w-28 sm:-ml-3' />
          <h1 className='rubik text-center text-4xl font-semibold'>Tech Triangle {data.data?.version}</h1>
          <ol className='list-inside list-decimal text-center text-sm sm:text-left'>
            <li className='mb-2'>
              Get started by clicking{' '}
              <code className='mono rounded bg-black/[.05] px-1 py-0.5 font-medium dark:bg-white/[.06]'>
                Download now
              </code>
              .
            </li>
            <li>
              For development go to the{' '}
              <code className='mono rounded bg-black/[.05] px-1 py-0.5 font-medium dark:bg-white/[.06]'>
                Github Repo
              </code>
              .
            </li>
          </ol>
          <div className='flex flex-col items-center gap-4 sm:flex-row'>
            <a
              className='flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:px-5 sm:text-base'
              href='https://github.com/codeAbinash/tech-triangle/releases/latest'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='dark:invert'
                src='/download-04-solid-rounded.svg'
                alt='Download icon'
                width={22}
                height={22}
              />
              Download now
            </a>
            <a
              className='flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base'
              href='https://github.com/codeAbinash/tech-triangle'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github Repo
            </a>
          </div>
        </main>
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
          <ModeToggle />
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://github.com/codeAbinash/tech-triangle'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img aria-hidden src='https://nextjs.org/icons/file.svg' alt='File icon' width={16} height={16} />
            Learn
          </a>
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://github.com/codeAbinash/tech-triangle'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img aria-hidden src='https://nextjs.org/icons/window.svg' alt='Window icon' width={16} height={16} />
            Examples
          </a>
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://github.com/codeAbinash/tech-triangle-backend'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img aria-hidden src='https://nextjs.org/icons/globe.svg' alt='Globe icon' width={16} height={16} />
            Backend Repo →`
          </a>
        </footer>
      </div> */}
    </>
  )
}

function TopArea({ version }: { version: string }) {
  return (
    <div className='mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center gap-10 px-10 pt-20'>
      <h1 className='title select-none text-center text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-8xl'>
        A collection of useful daily life tools
        <span className='ml-[0.5rem] mt-[1rem] inline-block rounded-[5px] bg-white/20 px-2 py-[1px] align-top text-xs font-semibold dark:bg-white/10 md:rounded-[6px] md:text-sm xl:rounded-[7px] xl:text-base'>
          {version}
        </span>
      </h1>
      <p className='max-w-2xl text-center text-sm opacity-70 sm:text-base lg:text-lg'>
        A collection of tools that can be used in daily life. These tools are designed to be simple, easy to use and
        accessible to everyone.
      </p>
      <div className='flex flex-col gap-4 md:flex-row'>
        <a href={github_latest_release} target='_blank'>
          <Btn>
            Download Now <DownloadIcon size={16} />
          </Btn>
        </a>
        <BtnGhost>
          Start Exploring <ChevronDown size={16} />
        </BtnGhost>
      </div>
    </div>
  )
}

function Btn({ children }: { children: React.ReactNode }) {
  return (
    <button className='flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-3.5 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]'>
      {children}
    </button>
  )
}

function BtnGhost({ children }: { children: React.ReactNode }) {
  return (
    <button className='flex items-center justify-center gap-2 rounded-full bg-background px-8 py-3.5 text-sm text-foreground transition-colors hover:bg-foreground/10'>
      {children}
    </button>
  )
}
