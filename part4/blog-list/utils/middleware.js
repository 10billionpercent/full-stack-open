const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body',function (req,_res) {
  return JSON.stringify(req.body)
})
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

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
  next(err)
}

const unknownErrorHandler = (err, req, res, _next) => {
  logger.info(err.message)
  return res.status(500).send({ error: 'internal server error' })
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, unknownErrorHandler }