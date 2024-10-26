import type { Context } from 'hono'

export function validationError(result: any, c: Context) {
  if (!result.success)
    return c.json({
      message: result.error.errors[0].message,
      errors: result.error.errors,
      status: false,
    })
}
