import VersionModel from '@/models/Version'
import versionUpdateValidator from '@/zod/version'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { validationError } from '../../utils/validation'

const updateVersion = new Hono().post('/', zValidator('json', versionUpdateValidator, validationError), async (c) => {
  console.log('This is the route for updateVersion')
  const { features, version, versionCode, forceUpdate, updateSize } = c.req.valid('json')

  const data = await VersionModel.findOneAndUpdate(
    {},
    {
      date: new Date(),
      version: version,
      versionCode: versionCode,
      features: features,
      forceUpdate: forceUpdate,
      size: updateSize,
    },
  )
    .sort({ createdAt: -1 })
    .select('-_id')

  console.log('Data', data)

  return c.json({
    message: 'Hello from updateVersion',
    status: true,
    data: null,
  })
})

export default updateVersion
