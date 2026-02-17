import Anecdote from "./Anecdote"
import { useDispatch, useSelector } from "react-redux"
import { increaseVotes } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const voteHandler = (anecdote) => {
  dispatch(increaseVotes(anecdote))
  dispatch(setNotificationWithTimeout(`you voted for '${anecdote.content}'`,5))
}

  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    else {
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

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