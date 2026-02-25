import './App.css'
import { useEffect } from 'react'
import { Form } from './components/Form'
import { useField, useResource } from './hooks'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <Form name='notes' 
      handleSubmit={handleNoteSubmit} 
      inputFields={[content]} />
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <Form name='persons' 
      handleSubmit={handlePersonSubmit}
      inputFields={[name, number]} />
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App