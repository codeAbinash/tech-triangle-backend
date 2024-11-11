import { handle } from 'hono/vercel'
import { checkAdmin } from './admin/checkAdmin'
import updateVersion from './admin/updateVersion'
import users from './admin/users'
import login from './auth/login'
import logout from './auth/logout'
import signup from './auth/signup'
import usernameStatus from './auth/usernameStatus'
import { validateToken } from './auth/validateToken'
import verify from './auth/verify'
import changelog from './changelog'
import devices from './devices'
import { hono } from './hono'
import profile from './profile/profile'
import version from './version'

// Apply middleware globally
hono.use('*', validateToken)
hono.use('/admin/*', checkAdmin)

const versionRoute = hono.route('/version', version)
const loginRoute = hono.route('/auth/login', login)
const signupRoute = hono.route('/auth/signup', signup)
const verifyRoute = hono.route('/auth/verify', verify)
const usernameStatusRoute = hono.route('/auth/username/status', usernameStatus)
const changelogRoute = hono.route('/changelog', changelog)
const profileRoute = hono.route('/profile', profile)
const devicesRoute = hono.route('/devices', devices)
const UsersRoute = hono.route('/admin/users', users)
const updateVersionRoute = hono.route('/admin/updateVersion', updateVersion)
const logoutRoute = hono.route('/logout', logout)

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
  | typeof signupRoute
  | typeof profileRoute
  | typeof devicesRoute
  | typeof verifyRoute
  | typeof usernameStatusRoute
  | typeof logoutRoute
  | typeof updateVersionRoute
  | typeof UsersRoute
