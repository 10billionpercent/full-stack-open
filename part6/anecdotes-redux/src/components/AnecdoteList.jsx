import Anecdote from "./Anecdote"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/voteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.likes - a.likes)
  return (
    <>
      <h2>Anecdotes</h2>
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