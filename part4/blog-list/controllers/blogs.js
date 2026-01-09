const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Blog.findById(id).then(blog => {
    if (blog) {
      res.json(blog)
    }
    else {
      res.status(404).end()
    }
  })
    .catch(err => next(err))
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      error: 'title, author, url and likes missing'
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

  if (!body.likes) {
    return res.status(400).json({
      error: 'likes missing'
    })
  }
  const blog = new Blog(req.body)
  blog.save().then(savedBlog => {
    res.status(201).json(savedBlog)
  })
    .catch(err => next(err))
})

module.exports = blogsRouter