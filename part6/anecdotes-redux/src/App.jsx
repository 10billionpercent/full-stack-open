import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import './App.css'
import { setAnecdotes } from "./reducers/anecdoteReducer"
import anecdoteService from "./services/anecdotes"

const App = () => {
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

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