import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import './App.css'
import AnecdoteList from './components/AnecdoteList'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const initialAnecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (initialAnecdotes.isLoading) {
    return <h3> loading.... </h3>
  }

  if (initialAnecdotes.isError) {
    return <h3> anecdote service not available due to problems in server </h3>
  }
  const anecdotes = initialAnecdotes.data

  return (
    <div>
      <h1> Software Engineering Anecdotes </h1>

      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} voteHandler={handleVote}/>
    </div>
  )
}

export default App
