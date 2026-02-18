import Anecdote from "./Anecdote"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { voteAnecdote } from "../requests"
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const { showNotification } = useContext(NotificationContext)

  const voteHandler = (anecdote) => {
   updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
   showNotification('VOTED', anecdote.content)
  }

    if (anecdotes.length === 0) {
    return (
      <h2> No anecdotes yet </h2>
    )
  }
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  return (
    <>
      <ul>
        {sortedAnecdotes.map(anecdote => <Anecdote key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteHandler(anecdote)}
        />)}
      </ul>
    </>
  )
}

export default AnecdoteList