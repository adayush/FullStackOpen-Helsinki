import { useState } from 'react'

const PersonForm = ({ newName, newNumber, handleInput, handleSubmit }) => (
  <form>
    <div>
      name: <input value={newName} id='name' onChange={handleInput} />
    </div>
    <div>
      number: <input value={newNumber} id='number' onChange={handleInput} />
    </div>
    <div>
      <button onClick={handleSubmit}>add</button>
    </div>
  </form>
)

const Persons = ({ persons, newFilter }) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    )}
  </div>
)

const Filter = ({ newFilter, handleInput }) => (
  <div>
    filter shown with <input value={newFilter} id='filter' onChange={handleInput} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(checkExists() === undefined) {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(person))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleInput = (event) => {
    switch(event.target.id) {
      case 'name':
        setNewName(event.target.value)
        break
      case 'number':
        setNewNumber(event.target.value)
        break
      case 'filter':
        setNewFilter(event.target.value)
        break
      default:
        break
    }
  }

  const checkExists = () => {
    return persons.find(person => person.name === newName || person.number === newNumber)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter newFilter={newFilter} handleInput={handleInput} />
      
      <h3>Add a new</h3>
      
      <PersonForm
        newName={newName} newNumber={newNumber}
        handleInput={handleInput} handleSubmit={handleSubmit}
      />
      
      <h3>Numbers</h3>
      
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App