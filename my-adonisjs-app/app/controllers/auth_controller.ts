import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async getUser({ auth }: HttpContext) {
    return auth.user
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

  async redirectToGoogle({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async handleGoogleCallback({ ally, response, auth }: HttpContext) {
    const google = ally.use('google')

    /**
     * User has denied access by canceling
     * the login flow
     */
    if (google.accessDenied()) {
      return response.redirect('http://localhost:3000/')
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (google.stateMisMatch()) {
      return response.redirect('http://localhost:3000/')
    }

    /**
     * GitHub responded with some error
     */
    if (google.hasError()) {
      return response.redirect('http://localhost:3000/')
    }

    const googleUser = await google.user()
    const user = await User.findBy('email', googleUser.email)
    if (!user) {
      const newUser = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        avatarUrl: googleUser.avatarUrl,
      })
      await auth.use('web').login(newUser)
      return response.redirect('http://localhost:3000/app')
    }
    await auth.use('web').login(user!)
    return response.redirect('http://localhost:3000/app')
  }
}
