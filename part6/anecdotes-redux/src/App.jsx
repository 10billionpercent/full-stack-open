import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import './App.css'
import { useSelector } from "react-redux"

const App = () => {
  const message = useSelector(state => state.notification)
  return (
    <div>
      <h1> Software Engineering Anecdotes </h1>
     <Notification message={message}/>
     <Filter />
     <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App