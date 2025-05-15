const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog){
    return response.status(400).json({ error: 'BlogId is not valid' })
  } else if ( blog.user.toString() === user.id.toString() ){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(400).json({ error: 'UserId associated with blog is not matching with current user' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blogToUpdate = await Blog.findById(request.params.id)
  if (blogToUpdate) {
    blogToUpdate.likes = likes
    const savedBlog = await blogToUpdate.save()
    response.status(200).json(savedBlog)
  } else {
    console.log('no blog with specified id found')
    response.status(404).end()
  }
})

module.exports = blogsRouter