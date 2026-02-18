import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  const { content } = request.body

  if (request.method === 'POST' || request.method === 'PUT') {
    if (content !== undefined) {
      if (!content || content.trim().length < 5) {
        return response.status(400).json({
          error: 'too short anecdote, must have length 5 or more'
        })
      }
    request.body.content = content.trim()
    }
  }
    next()
  }


server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
