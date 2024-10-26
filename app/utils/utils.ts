import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000)
}

export function sendUnauthorized(c: any) {
  return c.json({
    message: 'Unauthorized',
    status: false,
  })
}

export type UserTokenDecoded = jwt.JwtPayload & {
  _id: string
}

export function hashString(inputString: string) {
  return crypto.createHash('sha256').update(inputString).digest('hex')
}

type KeyType = 'token' | 'user'
export function ls(key: KeyType, value?: string) {
  if (value) {
    localStorage.setItem(key, value)
  }
  return localStorage.getItem(key)
}

// Browser details

// export function getBrowserName() {
//   const userAgent = navigator.userAgent
//   const browserList = ['Chrome', 'Firefox', 'Safari', 'Opera', 'MSIE', 'Trident', 'Edge']
//   let browserName = 'Unknown'
//   for (let i = 0; i < browserList.length; i++) {
//     if (userAgent.indexOf(browserList[i]) > -1) {
//       browserName = browserList[i]
//       break
//     }
//   }
//   return browserName
// }
declare global {
  interface Window {
    opr?: any
    opera?: any
    InstallTrigger?: any
    safari?: any
    StyleMedia?: any
    chrome?: any
  }
}
export function getBrowserName(): string {
  if (typeof window === 'undefined') return 'Unknown'

  // const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
  const isOpera = navigator.userAgent.indexOf(' OPR/') >= 0

  // Firefox 1.0+
  const isFirefox = typeof window.InstallTrigger !== 'undefined'

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    /constructor/i.test(window.HTMLElement as any) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification))

  // Internet Explorer 6-11
  const isIE = /*@cc_on!@*/ false || !!(document as any).documentMode

  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia

  // Chrome 1 - 79
  const isChrome = !!window.chrome
  //                                 && (!!window.chrome.webstore || !!window.chrome.runtime)

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1
  console.log(isEdgeChromium)

  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS

  const version = navigator.userAgent.match(/(Chrome|Safari|Firefox|Opera|Edge|Edg)\/(\d+)/)
  let browserName = 'Unknown'

  if (isEdge || isEdgeChromium) browserName = 'Edge'
  else if (isOpera) browserName = 'Opera'
  else if (isFirefox) browserName = 'Firefox'
  else if (isChrome) browserName = 'Chrome'
  else if (isSafari) browserName = 'Safari'
  else if (isIE) browserName = 'MSIE'
  else if (isBlink) browserName = 'Blink'

  return browserName + (version ? ` ${version[2]}` : '')
}

// export function getBrowserName() {
//   if (typeof navigator === 'undefined') return 'Unknown'

//   const ua = navigator.userAgent
//   let tem
//   let match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

//   if (/trident/i.test(match[1])) {
//     tem = /\brv[ :]+(\d+)/g.exec(ua) || []
//     return `IE ${tem[1] || ''}`
//   }

//   if (match[1] === 'Chrome') {
//     tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
//     if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
//   }

//   match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
//   if ((tem = ua.match(/version\/(\d+)/i)) != null) match.splice(1, 1, tem[1])

//   return match.join(' ')
// }

// Operating system details

const osMap: { [key: string]: string } = {
  'Windows NT 10.0': 'Windows 10/11',
  'Windows NT 6.3': 'Windows 8.1',
  'Windows NT 6.2': 'Windows 8',
  'Windows NT 6.1': 'Windows 7',
  'Windows NT 6.0': 'Windows Vista',
  'Windows NT 5.1': 'Windows XP',
  'Windows NT 5.0': 'Windows 2000',
  Mac: 'Mac/iOS',
  X11: 'UNIX',
  Linux: 'Linux',
}
export function getOSName() {
  if (typeof window === 'undefined') return 'Unknown'
  const userAgent = window.navigator.userAgent
  for (const [key, value] of Object.entries(osMap)) {
    if (userAgent.indexOf(key) !== -1) {
      return value
    }
  }
  return 'Unknown'
}
