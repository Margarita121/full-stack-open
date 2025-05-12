const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const initialBlogs = require('./blogs')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog contains id field', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  assert.strictEqual(Object.hasOwn(firstBlog, 'id'), true)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New test blog',
    author: 'New Author',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 1,
  }
  await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})