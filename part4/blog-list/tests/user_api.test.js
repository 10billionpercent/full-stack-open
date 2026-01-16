const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
await User.deleteMany({}) 

const passwordHash = await bcrypt.hash('meow', 10)
const user = new User({ username: 'root', 
    passwordHash })

await user.save()
    })

describe('addition of a new user', () => {
test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { "username":"panther",
    "name":"Black Cat",
    "password":"panther123" }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(r => r.username)
    assert(usernames.includes('I am a panther'))
})

test('a user with no username is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { "password": "invalid123" }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('a user with no password is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { "username": "Invalid" }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('a user with the same username is not added again', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = { "username":"panther",
    "name":"Orange Cat",
    "password":"panther123329587" } 

    const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type',/application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(res.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})
})
