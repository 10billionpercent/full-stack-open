import { useField } from "../hooks"

const AnecdoteForm = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
        <h2> add new anecdote</h2>
         <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm