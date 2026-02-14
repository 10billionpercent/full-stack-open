import Anecdote from "./Anecdote"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/voteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

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
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />)}
      </ul>
    </>
  )
}
export default AnecdoteList