import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import './App.css'
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const message = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
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