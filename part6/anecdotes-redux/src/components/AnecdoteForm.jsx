import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from "../reducers/notificationActions"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    if (!content) {
         alert('enter all details')
    }
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotificationWithTimeout(`you added ${content}`,5))
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