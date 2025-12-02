import { useState, useEffect } from 'react'
import Search from './components/Search'
import Result from './components/Result'
import Add from './components/Add'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newId, setNewId] = useState(2)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [found, setFound] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
          console.log(persons.map(person => person.name))
  const handleNameChange = (e) => {
        setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const addName = (e) => {
        e.preventDefault()
    if (persons.some(person => person.name ===newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    if (newName === '' || newNumber === '') {
      alert('enter all details')
      return
    }
    let newPerson = {id: newId, name : newName, number: newNumber}
    setPersons([...persons, newPerson])
    setNewId(newId+1)
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Search inputHandler={handleSearchChange} searchHandler={searchName} search={search}/>
      <Result found={found}/>
      <Add addHandler={addName} newName={newName} nameHandler={handleNameChange}
      newNumber={newNumber} numberHandler={handleNumberChange}/>
       </div>  
  )
}

export default App