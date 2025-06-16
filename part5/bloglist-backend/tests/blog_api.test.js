const { test, after, beforeEach, describe } = require('node:test')
const _ = require('lodash')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const initialBlogs = require('./blogs')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  let loginResponse = ''
  beforeEach(async () => {
    //first delete previous blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    //then create new user
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'password',
    }

    const newUserResponse = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    delete newUser.name

    //then login as new user and save the token
    loginResponse = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)

    //add user id field to each of the blogs
    initialBlogs.map((blog => blog.user = newUserResponse.body.id))

    await Blog.insertMany(initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}` )
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${loginResponse.body.token}` )

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  describe('viewing a specific note', () => {
    test('blog contains id field', async () => {
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
      const firstBlog = response.body[0]

      assert.strictEqual(Object.hasOwn(firstBlog, 'id'), true)
    })
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'New test blog',
        author: 'New Author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const lastBlog = blogsAtEnd[initialBlogs.length]

      assert.deepStrictEqual(lastBlog.title, newBlog.title)
      assert.deepStrictEqual(lastBlog.author, newBlog.author)
      assert.deepStrictEqual(lastBlog.url, newBlog.url)

    })

    test('a new blog can be added without likes', async () => {
      const newBlog = {
        title: 'New blog without likes',
        author: 'New Author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const lastBlog = blogsAtEnd[initialBlogs.length]

      assert.deepStrictEqual(lastBlog.title, newBlog.title)
      assert.deepStrictEqual(lastBlog.author, newBlog.author)
      assert.deepStrictEqual(lastBlog.url, newBlog.url)
      assert.deepStrictEqual(lastBlog.likes, 0)

    })

    test('blog without title can not be added', async () => {
      const newBlog = {
        author: 'New Author',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 1,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .send(newBlog)
        .expect(400)

    })

    test('blog without url can not be added', async () => {
      const newBlog = {
        title: 'New blog without likes',
        author: 'New Author',
        likes: 1,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .send(newBlog)
        .expect(400)

    })
  })

  describe('updating likes in existing blog', () => {
    test('number of likes can be updated in existing blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.likes = 2
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const firstBlog = blogsAtEnd[0]

      assert.deepStrictEqual(firstBlog.likes, 2)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${loginResponse.body.token}` )
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert(!_.includes(blogsAtEnd, blogToDelete))
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})