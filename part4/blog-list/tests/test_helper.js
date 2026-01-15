const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => users.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }