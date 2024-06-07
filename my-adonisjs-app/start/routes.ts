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
import mail from '@adonisjs/mail/services/main'

const PostsController = () => import('#controllers/posts_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth routes
router
  .group(() => {
    router.get('/', [AuthController, 'getUser']).use(middleware.auth())
    router.post('/sign-up', [AuthController, 'signUp'])
    router.post('/sign-in', [AuthController, 'signIn'])
    router.post('/sign-out', [AuthController, 'signOut'])
  })
  .prefix('auth')

//Post routes

router
  .group(() => {
    router.post('/create', [PostsController, 'createPost']).use(middleware.auth())
    router.get('/all', [PostsController, 'getAllPosts']).use(middleware.auth())
    router.get('/', [PostsController, 'getPostsOfUser']).use(middleware.auth())
    router.get('/:id', [PostsController, 'getPost']).use(middleware.auth())
    router.put('/:id', [PostsController, 'updatePost']).use(middleware.auth())
    router.delete('/:id', [PostsController, 'deletePost']).use(middleware.auth())
  })
  .prefix('posts')

router.post('test-email', async ({}) => {
  await mail.send((message) => {
    message
      .from('test@localhost')
      .subject('Verify your email address')
      .to('harternicolas134@gmail.com')
      .html('' + '<h1>Hello</h1>' + '<p>Test de cet email de fou</p>')
  })
  return 'email sent'
})
