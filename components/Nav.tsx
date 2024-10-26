'use client'

import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { AlignJustify, LogInIcon, Moon, Sun, SunMoon, UserRoundPlusIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import ModeToggle from './ModeToggle'
import { Button } from './ui/button'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

function Logo() {
  return (
    <Link href='/' className='mr-5 flex items-center text-base font-semibold'>
      <img src='/icon_round.svg' className='duration-8000 mr-3 aspect-square h-7 animate-spin ease-linear' alt='Logo' />
      <h1 className='text-[0.95rem]'>Tech Triangle</h1>
    </Link>
  )
}

export default function Nav() {
  const path = usePathname()

  return (
    <>
      <div className='fixed top-0 z-10 w-full border border-transparent border-b-black/10 bg-background dark:border-b-white/15'>
        <div className='mx-auto flex max-w-[100rem] justify-between px-5 py-3'>
          <Logo />
          <NavigationMenu className='hidden md:block'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Download</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <a
                          className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                          href='/'
                        >
                          {/* <Icons.logo className="h-6 w-6" /> */}
                          <div className='mb-2 mt-4 text-lg font-medium'>shadcn/ui</div>
                          <p className='text-sm leading-tight text-muted-foreground'>
                            Beautifully designed components that you can copy and paste into your apps. Accessible.
                            Customizable. Open Source.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href='/docs' title='Introduction'>
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href='/docs/installation' title='Installation'>
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href='/docs/primitives/typography' title='Typography'>
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Source Code</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href='/docs' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Docs</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='hidden lg:flex'>
                <Link href='/' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Github</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='hidden xl:flex'>
                <Link href='/' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Development</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className='hidden 2xl:flex'>
                <Link href='/' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Resources</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className='hidden items-center justify-between gap-3 md:flex'>
            {path !== '/signup' && (
              <Link href='/signup'>
                <Button className='w-full' variant={path === '/login' ? 'default' : 'secondary'}>
                  <UserRoundPlusIcon size={16} className='mr-2' strokeWidth={2.5} />
                  Sign up
                </Button>
              </Link>
            )}
            {path !== '/login' ? (
              <Link href='/login'>
                <Button variant='default' className='hidden w-full lg:flex'>
                  <LogInIcon size={16} strokeWidth={2.5} className='mr-2' />
                  Login
                </Button>
              </Link>
            ) : null}

            <div className='w-full'>
              <ModeToggle />
            </div>
          </div>
          <div className='flex md:hidden'>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}

function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>
            <div className='flex flex-col-reverse items-center justify-center gap-3 pt-5'>
              <ThemeChanger />
              <Button variant='secondary' className='w-full'>
                <LogInIcon size={16} strokeWidth={2.5} className='mr-2' />
                Login
              </Button>
              <Button className='w-full'>
                <UserRoundPlusIcon size={16} className='mr-2' strokeWidth={2.5} />
                Sign up
              </Button>
            </div>
          </SheetDescription>
          <SheetFooter className='mx-auto pt-5'></SheetFooter>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

const themes = ['light', 'dark', 'system']
function changeTheme(curr: string | undefined, set: React.Dispatch<React.SetStateAction<string>>) {
  const next = (themes.indexOf(curr || 'system') + 1) % themes.length
  set(themes[next])
}
function ThemeChanger() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant='secondary'
      className='w-full'
      onClick={() => {
        changeTheme(theme, setTheme)
      }}
    >
      {theme === 'light' ? (
        <Sun className='mr-2 h-5 w-5' />
      ) : theme === 'system' ? (
        <SunMoon className='mr-2 h-5 w-5' />
      ) : (
        <Moon className='mr-2 h-5 w-5' />
      )}
      <span className='capitalize'>{theme}</span>
    </Button>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
