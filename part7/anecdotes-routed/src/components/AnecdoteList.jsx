import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {

  if (anecdotes.length === 0) {
    return (
      <h2> No anecdotes yet </h2>
    )
  }
  const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  return (
    <>
      <ul>
        {sortedAnecdotes.map(anecdote => 
          <li key={anecdote.id}>
            <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </>
  )
}
export default AnecdoteList