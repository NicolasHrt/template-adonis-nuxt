import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'

export default class PostsController {
  async createPost({ auth, request }: HttpContext) {
    const { title, content } = await createPostValidator.validate(request.all())
    await Post.create({
      title,
      content,
      userId: auth.user!.id,
    })
    return { message: 'Post created successfully' }
  }

  async getAllPosts() {
    return Post.all()
  }

  async getPostsOfUser({ auth }: HttpContext) {
    return auth.user!.related('posts').query()
  }

  async getPost({ params, auth }: HttpContext) {
    return Post.query().where('userId', auth.user!.id).where('id', params.id).firstOrFail()
  }

  async updatePost({ auth, request, params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    if (post.userId !== auth.user!.id) {
      throw new Error('Unauthorized')
    }
    const { title, content } = await createPostValidator.validate(request.all())
    post.title = title
    post.content = content
    await post.save()
    return response.status(200).json(post)
  }

  async deletePost({ auth, params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    if (post.userId !== auth.user!.id) {
      throw new Error('Unauthorized')
    }
    await post.delete()
    return response.status(204)
  }
}
