import { z } from 'zod'
const versionUpdateValidator = z.object(
  {
    versionCode: z.number({ required_error: 'Version code is required.' }).int().positive(),
    criticalVersionCode: z.number({ required_error: 'Critical version code is required.' }).int().positive(),
    version: z.string({ required_error: 'Version is required.' }).trim().min(1).max(255),
    updateSize: z.string({ required_error: 'Size is required.' }).trim().min(1).max(255),
    features: z
      .array(z.string({ required_error: 'Feature is required.' }).trim().min(1).max(100), {
        required_error: 'Features is required.',
      })
      .max(100),
  },
  { required_error: 'Version is required.' },
)

export default versionUpdateValidator
