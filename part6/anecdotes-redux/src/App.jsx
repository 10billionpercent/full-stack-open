import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import './App.css'

const App = () => {
  return (
    <div>
      <h1> Software Engineering Anecdotes </h1>
     <Filter />
     <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App