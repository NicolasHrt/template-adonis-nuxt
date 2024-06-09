/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'
const SubscriptionsController = () => import('#controllers/subscriptions_controller')

const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth routes
router
  .group(() => {
    router.get('/google/redirect', [AuthController, 'redirectToGoogle'])
    router.get('/google/callback', [AuthController, 'handleGoogleCallback'])
    router.get('/', [AuthController, 'getUser']).use(middleware.auth())
    router.post('/sign-out', [AuthController, 'signOut'])
    router.delete('/delete', [AuthController, 'deleteUser']).use(middleware.auth())
  })
  .prefix('auth')

router.post('/subscriptions/update', [SubscriptionsController, 'update'])
