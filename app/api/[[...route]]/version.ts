import { connectMongo } from '@/connection/connection'
import VersionModel from '@/models/Version'
import { Hono } from 'hono'

const version = new Hono().get('/', async (c) => {
  await connectMongo()
  const version = await VersionModel.findOne()

  if (version)
    return c.json({
      message: 'Version found',
      status: true,
      data: {
        version: version.version,
        date: version.date,
        forceUpdate: version.forceUpdate,
        features: version.features,
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
