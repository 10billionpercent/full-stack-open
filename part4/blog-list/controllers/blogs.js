const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  .populate('user',{ username: 1, name: 1 })
  res.json(blogs)
  })

blogsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
      res.json(blog)
    }
    else {
      res.status(404).end()
    }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!req.token) {
      return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
     res.status(400).json({ error: 'User Id missing or invalid' })
  }

  if (!body) {
    return res.status(400).json({
      error: 'title, author, url missing'
    })
  }

  if (!body.title) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.author) {
    return res.status(400).json({
      error: 'author missing'
    })
  }

  if (!body.url) {
    return res.status(400).json({
      error: 'url missing'
    })
  }
  
  const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes || 0,
  user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  console.log(id)
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { author, title, url, likes } = req.body
  const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).end()
    }

    blog.author = author
    blog.title = title
    blog.url = url
    blog.likes = likes

    const savedBlog = await blog.save()
      res.json(savedBlog)
    })

module.exports = blogsRouter