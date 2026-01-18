const { test, after, beforeEach, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

let token 
let user

describe('when some blogs are initially saved', () => {

before(async () => {
await User.deleteMany({}) 
const passwordHash = await bcrypt.hash('meow', 10)
user = new User({ username: 'root', 
    passwordHash })
await user.save()

const loggedInUser = await api
    .post('/api/login')
    .send({ username: 'root', 
    password: 'meow' })
token = loggedInUser.body.token
})

beforeEach(async () => {
await Blog.deleteMany({}) 

const blogsWithUser = helper.initialBlogs.map(blog => ({
    ...blog,
    user: user._id
}))

await Blog.insertMany(blogsWithUser)
    })

test('blogs are returned as JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
    assert.strictEqual(blogs.length, 3)
})

test('identifier is named id', async () => {
    const blogs = await helper.blogsInDb()
    assert(blogs[0].id)
    assert.strictEqual(blogs[0]._id, undefined)
})

describe('addition of a new blog', () => {
test('a blog with valid token can be added', async () => {
    const newBlog = {"title":"I am a panther",
    "author":"Black Cat",
    "url":"https://meowmeow.com",
    "likes":200}

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const blogs = await helper.blogsInDb()

    const titles = blogs.map(r => r.title)

    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    
    assert(titles.includes('I am a panther'))
})

test('a blog with no likes gets 0', async () => {
    const newBlog = {"title":"Boring Title",
    "author":"NPC",
    "url":"https://boring.com"}

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const blogs = await helper.blogsInDb()

    const titles = blogs.map(r => r.title)

    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    
    assert(titles.includes('Boring Title'))
})

test('a blog with no title is not added', async () => {
    const newBlog = {
    "author":"NPC",
    "url":"https://boring.com"}

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('a blog with no url is not added', async () => {
    const newBlog = {"title": "So Boring",
    "author":"NPC"}

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('a blog without token is not added', async () => {
    const newBlog = {"title":"I am a panther",
    "author":"Black Cat",
    "url":"https://meowmeow.com",
    "likes":200}

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type',/application\/json/)

    const blogs = await helper.blogsInDb()

    const titles = blogs.map(r => r.title)

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
})
})

describe('deletion of a blog', () => {
    test('a blog with valid id is successfully deleted', async () => {
    const blogs = await helper.blogsInDb()

    const idToDelete = blogs[0].id
    
    await api
    .delete(`/api/blogs/${idToDelete}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
    
    const afterDeleting = await helper.blogsInDb()

    const ids = afterDeleting.map(r => r.id)

    assert(!ids.includes(idToDelete))

    assert.strictEqual(afterDeleting.length, blogs.length - 1)
})
})

describe('updation of a blog', () => {
    test('existing blog likes is updated correctly', async () => {
    const newBlog = {"title": "Cat wars",
    "author": "Orange Cat",
    "url": "https://meow.com",
    "likes":2000}

    const blogs = await helper.blogsInDb()

    const idToUpdate = blogs.find(b => b.title === newBlog.title).id

    await api
    .put(`/api/blogs/${idToUpdate}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type',/application\/json/)

    const updated = await helper.blogsInDb()

    const updatedBlog = updated.find(b => b.id === idToUpdate)

    assert.strictEqual(updated.length, helper.initialBlogs.length)
    
    assert.strictEqual(updatedBlog.likes, newBlog.likes)
})
})
})

after(async () => {
    await mongoose.connection.close()
})