const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

describe('test user login', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('create new user and login as that user', async () => {
    const newUser = {
      username: 'test',
      name: 'Test User',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    delete newUser.name

    const loginResponse = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)

    assert(loginResponse.body.username.includes(newUser.username))
  })

})


after(async () => {
  await mongoose.connection.close()
})