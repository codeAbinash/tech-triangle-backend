import hcWithType from '@/dist/app/rpc/hcWithType'
import { ls } from '../utils/utils'

const client = hcWithType(
  process.env.NODE_ENV === 'production' ? 'https://techtriangle.vercel.app' : 'http://localhost:3000',
  {
    headers() {
      if (typeof localStorage === 'undefined') return { Authorization: '' }
      return {
        Authorization: localStorage.getItem('token') ? `Bearer ${ls('token')}` : '',
      }
    },
  },
)

export default client

export const testClient = hcWithType('http://localhost:3000', {
  headers() {
    return { Authorization: '' }
  },
})
