import { useState, useEffect } from 'react'
import Search from './components/Search'
import Result from './components/Result'
import Add from './components/Add'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [found, setFound] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
      }, [])
  const handleNameChange = (e) => {
        setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const updateMessage = (newMessage, newType='success') => {
    setMessage(newMessage)
    setType(newType)
      setTimeout(() => {
        setMessage(null)
      },5000)
  }
  const addName = (e) => {
        e.preventDefault()
    if (persons.some(person => person.name ===newName)) {
      if (window.confirm(`Update ${newName} ?`)) {
        let personToUpdate = persons.find(p => p.name === newName)
        let updatedPerson = {...personToUpdate, number: newNumber}
        const id = updatedPerson.id
        personService
        .updatePerson(id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === id ? returnedPerson : p))
           updateMessage(`Updated ${newName}`)}
        )
        .catch(error => {
          updateMessage(`Information of ${newName} has already been removed from server`, 'error')
          setPersons(persons.filter(p => p.id !==id))
        })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    if (newName === '' || newNumber === '') {
      alert('enter all details')
      return
    }
    let newPerson = {name : newName, number: newNumber}
    personService
    .addPerson(newPerson)
    .then(returnedPerson =>{ 
    setPersons([...persons, returnedPerson])
    updateMessage(`Added ${newName}`, 'success')
    setNewName('')
    setNewNumber('')    
    })
    .catch(err => {
      updateMessage(err.response.data.err)
    })
  }
  const searchName = (e) => {
    e.preventDefault()
    if (search === '') {
      alert('enter a name to search')
      return
    }
    let foundPersons = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    setFound(foundPersons)
    if (foundPersons.length ===0) {
      alert(`${search} not found in phonebook`)
    }
  }

const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .deletePerson(person.id)
      .then(() => setPersons(persons.filter( p => p.id !== person.id)))
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type = {type} />
      <Search inputHandler={handleSearchChange} searchHandler={searchName} search={search}/>
      <Result found={found}/>
      <Add addHandler={addName} newName={newName} nameHandler={handleNameChange}
      newNumber={newNumber} numberHandler={handleNumberChange}/>
      <Persons persons = {persons} deleteHandler = {deleteNumber} />
       </div>  
  )
}

export default App