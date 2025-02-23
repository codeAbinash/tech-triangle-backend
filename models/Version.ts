import mongoose from 'mongoose'
import { z } from 'zod'

export const versionValidator = z.object({
  version: z
    .string()
    .min(5, { message: 'Version length must be like x.y.z, minimum 5 characters' })
    .max(20, { message: 'Version length must be in 20 characters' }),
  date: z.date(),
  versionCode: z.number(),
  features: z.array(z.string()),
  criticalVersionCode: z.number(),
})

const VersionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: [true, 'Version is required'],
    minlength: [5, 'Version length must be x.y.z, minimum 5 characters'],
    maxlength: [20, 'Version length must be in 20 characters'],
  },
  date: {
    type: Date,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  versionCode: {
    type: Number,
    required: true,
  },
  criticalVersionCode: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
})

const VersionModel = mongoose.models.Version || mongoose.model('Version', VersionSchema)

export default VersionModel
