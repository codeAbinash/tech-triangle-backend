import { connectMongo } from '@/connection/connection'
import VersionModel from '@/models/Version'
import { Hono } from 'hono'

const version = new Hono().get('/', async (c) => {
  await connectMongo()
  const version = await VersionModel.findOne().sort({ createdAt: -1 })

  if (version)
    return c.json({
      message: 'Version found',
      status: true,
      data: {
        version: version.version,
        date: version.date,
        features: version.features,
        versionCode: version.versionCode,
        criticalVersionCode: version.criticalVersionCode,
        size: version.size,
        id: version._id.toString(),
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
