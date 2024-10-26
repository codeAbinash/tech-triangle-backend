import { handle } from 'hono/vercel'
import login from './auth/login'
import signup from './auth/signup'
import { validateToken } from './auth/validateToken'
import changelog from './changelog'
import devices from './devices'
import { hono } from './hono'
import profile from './profile/profile'
import redis from './redis/redis'
import version from './version'
import verify from './auth/verify'
import usernameStatus from './auth/usernameStatus'
import getAllUsers from './admin/getAllUsers'
import logout from './auth/logout'

// Apply middleware globally
hono.use('*', validateToken)

const versionRoute = hono.route('/version', version)
const loginRoute = hono.route('/auth/login', login)
const signupRoute = hono.route('/auth/signup', signup)
const verifyRoute = hono.route('/auth/verify', verify)
const usernameStatusRoute = hono.route('/auth/username/status', usernameStatus)
const changelogRoute = hono.route('/changelog', changelog)
const redisRoute = hono.route('/redis', redis)
const profileRoute = hono.route('/profile', profile)
const devicesRoute = hono.route('/devices', devices)
const getAllUsersRoute = hono.route('/admin/users/all', getAllUsers)
const logoutRoute = hono.route('/logout' , logout)

const route = hono.get('/', async (c) => {
  return c.json({
    message: 'Hello from hono',
    status: true,
  })
})

export const GET = handle(hono)
export const POST = handle(hono)

export type AppType =
  | typeof route
  | typeof versionRoute
  | typeof loginRoute
  | typeof changelogRoute
  | typeof redisRoute
  | typeof signupRoute
  | typeof redisRoute
  | typeof profileRoute
  | typeof devicesRoute
  | typeof verifyRoute
  | typeof usernameStatusRoute
  | typeof getAllUsersRoute
  | typeof logoutRoute
