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
    passwordHash
})

await user.save()
    })

describe('addition of a new user', () => {
test('a valid user can be added', async () => {
    const newUser = {"username":"I am a panther",
    "name":"Black Cat",
    "password":"https://meowmeow.com"}

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const users = await helper.usersInDb()

    const usernames = users.map(r => r.username)

    assert.strictEqual(users.length, helper.initialusers.length + 1)
    
    assert(usernames.includes('I am a panther'))
})

test('a user with no username is not added', async () => {
    const newUser = { "password":"https://boring.com" }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const users = await helper.usersInDb()

    assert.strictEqual(users.length, helper.initialusers.length)
})

test('a user with no password is not added', async () => {
    const newUser = { "username": "So Boring" }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const users = await helper.usersInDb()

    assert.strictEqual(users.length, helper.initialusers.length)
})
})