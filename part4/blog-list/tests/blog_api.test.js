const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {"title":"React patterns",
    "author":"Hange Zoë",
    "url":"https://titansrwonderful.com/",
    "likes":7},
    {"title":"Type wars",
    "author":"Orange Cat",
    "url":"https://meow.com",
    "likes":2},
    {"title":"Cat wars",
    "author":"Orange Cat",
    "url":"https://meow.com",
    "likes":20}
]

beforeEach(async () => {
await Blog.deleteMany({}) 
    await Promise.all(
        initialBlogs.map(blog => new Blog(blog).save())
    )
    })


test('blogs are returned as JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('all blogs are returned', async () => {
    res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, 3)
})

test('identifier is named id', async () => {
    res = await api.get('/api/blogs')
    assert(res.body[0].id)
    assert.strictEqual(res.body[0]._id, undefined)
})

test('a valid blog can be added', async () => {
    const newBlog = {"title":"I am a panther",
    "author":"Black Cat",
    "url":"https://meowmeow.com",
    "likes":200}

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const res = await api.get('/api/blogs')

    const titles = res.body.map(r => r.title)

    assert.strictEqual(res.body.length, initialBlogs.length + 1)
    
    assert(titles.includes('I am a panther'))
})
after(async () => {
    await mongoose.connection.close()
})