import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Hange Zoe' , number: '9876543210'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNameChange = (e) => {
        setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
  }
  const addName = (e) => {
        e.preventDefault()
    if (persons.some(person => person.name ===newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
    let newPersons = [...persons]
    newPersons.push({name : newName, number: newNumber})
    setPersons(newPersons)
    console.log(newPersons)
    setNewName('')
    setNewNumber('')
  }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name = <input value ={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone number = <input value ={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div >
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    </div>
  )
}

export default App