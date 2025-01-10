import VersionModel from '@/models/Version'
import versionUpdateValidator from '@/zod/version'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { validationError } from '../../utils/validation'

const updateVersion = new Hono().post('/', zValidator('json', versionUpdateValidator, validationError), async (c) => {
  console.log('This is the route for updateVersion')
  const { features, version, versionCode, updateSize, criticalVersionCode } = c.req.valid('json')

  const data = await VersionModel.findOneAndUpdate(
    {},
    {
      date: new Date(),
      version,
      versionCode,
      criticalVersionCode,
      features,
      size: updateSize,
    },
  )
    .sort({ createdAt: -1 })
    .select('-_id')

  console.log('Data', data)

  return c.json({
    message: data ? 'Version updated successfully' : 'Failed to update version',
    status: !!data,
    data,
  })
})

export default updateVersion
