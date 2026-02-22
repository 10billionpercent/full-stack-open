import { useField } from "../hooks"

const AnecdoteForm = (props) => {
  const { reset: resetContent, ...content} = useField('content')
  const { reset: resetAuthor, ...author} = useField('author')
  const { reset: resetInfo, ...info} = useField('info')


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
        <button> create </button>
        <button  type="button" onClick={() => {resetContent()
          resetAuthor()
          resetInfo()
        }}> reset </button>
      </form>
    </div>
  )
}

export default AnecdoteForm