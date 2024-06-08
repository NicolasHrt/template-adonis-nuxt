import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import User from '#models/user'

export default class AuthController {
  async getUser({ auth }: HttpContext) {
    return auth.user
  }

  async signUp({ request, response, auth }: HttpContext) {
    const payload = await registerUserValidator.validate(request.all())
    const user = await User.create(payload)
    await auth.use('web').login(user)
    return response.status(201).json({ message: 'User created and logged in' })
  }

  async signIn({ request, response, auth }: HttpContext) {
    const { email, password } = await loginUserValidator.validate(request.all())
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user, !!request.input('remember_me'))
    return response.status(201).json({ message: 'User logged in' })
  }

  async signOut({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.status(201).json({ message: 'User logged out' })
  }

  async deleteUser({ response, auth }: HttpContext) {
    const user = auth.user
    await user!.delete()
    return response.status(201).json({ message: 'User deleted' })
  }
}
