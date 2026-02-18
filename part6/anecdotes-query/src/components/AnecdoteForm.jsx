import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { showNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotification('ADDED', variables.content)
    },
    onError: () => {
      showNotification('ERROR')
    }
  })


  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }


  return (
    <div>
      <h2> add new anecdote </h2>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
