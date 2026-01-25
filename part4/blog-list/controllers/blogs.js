const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../utils/middleware').tokenExtractor
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  .populate('user',{ username: 1, name: 1 })
  res.json(blogs)
  })

/*blogsRouter.get('/my', tokenExtractor, userExtractor, async (req, res) => {
const user = req.user

const blogs = await Blog.find({ user: user._id })
  res.json(blogs)
})*/

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


blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
  const body = req.body
  const user = req.user

  if (!user) {
     res.status(401).json({ error: 'User Id missing or invalid' })
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

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
  const id = req.params.id
  const blogToDelete = await Blog.findById(id)
  const user = req.user
  
  if (!blogToDelete) {
    return res.status(404).end()
  }
  if (blogToDelete.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(id)
    return res.status(204).end()
  }
  else {
    return res.status(403).json({ error: 'forbidden' })
  }
})

blogsRouter.put('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
  const id = req.params.id
  console.log(req.body)
  const { author, title, url, likes } = req.body
  const user = req.user
  const blogToUpdate = await Blog.findById(id)
    if (!blogToUpdate) {
      return res.status(404).end()
    }

    blogToUpdate.author = author
    blogToUpdate.title = title
    blogToUpdate.url = url
    blogToUpdate.likes = likes

    if (blogToUpdate.user.toString() === user._id.toString()) {
       const savedBlog = await blogToUpdate.save()
      res.json(savedBlog)
      user.save()
    }

    else {
        return res.status(403).json({ error: 'forbidden' })
    }
    })

module.exports = blogsRouter