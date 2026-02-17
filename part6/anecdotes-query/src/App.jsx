import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import './App.css'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

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
