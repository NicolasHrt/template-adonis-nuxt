import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().unique(async (db, value) => {
      const username = await db.from('users').where('username', value).first()
      return !username
    }),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const email = await db.from('users').where('email', value).first()
        return !email
      }),
    password: vine.string().minLength(4),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
