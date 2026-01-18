const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {"title":"React patterns",
    "author":"Hange Zoë",
    "url":"https://titansrwonderful.com/",
    "likes":7,
    "user": "696cd42b6352e925f3531921"},
    {"title":"Type wars",
    "author":"Orange Cat",
    "url":"https://meow.com",
    "likes":2,
    "user": "696cd42b6352e925f3531921"},
    {"title":"Cat wars",
    "author":"Orange Cat",
    "url":"https://meow.com",
    "likes":20,
    "user": "696cd42b6352e925f3531921"}
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }