import { connectMongo } from '@/connection/connection'
import VersionModel from '@/models/Version'
import { Hono } from 'hono'

const version = new Hono().get('/', async (c) => {
  await connectMongo()
  const version = await VersionModel.findOne().sort({ createdAt: -1 }).select('-_id')

  if (version)
    return c.json({
      message: 'Version found',
      status: true,
      data: {
        version: version.version,
        date: version.date,
        forceUpdate: version.forceUpdate,
        features: version.features,
        versionCode: version.versionCode,
        size: version.size,
      },
    })

  return c.json({
    message: 'No version found',
    status: false,
    data: null,
  })
})

export default version
export type Version = typeof version
