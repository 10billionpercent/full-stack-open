import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
         alert('enter all details')
    }
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <form onSubmit={addAnecdote}>
      <h2> add new anecdote </h2>
          <input name="anecdote"/>
        <button type="submit">add</button>
    </form>
  )
}

export default AnecdoteForm