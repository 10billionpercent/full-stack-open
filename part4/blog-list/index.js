require('dotenv').config()
const Blog = require('./models/blog')

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
morgan.token('body',function (req,_res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

app.get('/api/blogs/:id', (req, res, next) => {
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

app.post('/api/blogs', (req, res, next) => {
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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

/*const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.title === 'CastError') {
    return res.status(400).send({ error : 'malformatted id' })
  }
  else if (err.title === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)*/

const unknownErrorHandler = (err, req, res, _next) => {
  console.log(err.message)
  return res.status(500).send({ error: 'internal server error' })
}

app.use(unknownErrorHandler)
const PORT = process.env.PORT || 3002
app.listen(PORT)