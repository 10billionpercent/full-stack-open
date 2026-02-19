import Anecdote from "./Anecdote"

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
        {sortedAnecdotes.map(anecdote => <Anecdote key={anecdote.id}
          anecdote={anecdote}
        />)}
      </ul>
    </>
  )
}
export default AnecdoteList