const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

morgan.token('body',function (req,_res) {
      return JSON.stringify(req.body)
})
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  else {
     req.token = null
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.info(err)
  if (err.name === 'CastError') {
    return res.status(400).send({ error : 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }
  else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }
  next(err)
}

const unknownErrorHandler = (err, req, res, _next) => {
  logger.info(err.message)
  return res.status(500).send({ error: 'internal server error' })
}

module.exports = { requestLogger, tokenExtractor, userExtractor, unknownEndpoint, errorHandler, unknownErrorHandler }