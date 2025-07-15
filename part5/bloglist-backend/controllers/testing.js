const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/insert', async (request, blogArray, response) => {
  await Blog.insertMany(blogArray)
  console.log('blog array from insert')
  console.log(blogArray)
  response.status(204).end()
})

module.exports = router