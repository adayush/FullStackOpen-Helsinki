import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({ persons, newFilter, handleDelete }) => (
  <div>
    {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person =>
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)}>delete</button>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const find = checkExists()
    if(find === undefined) {
      const person = {
        name: newName,
        number: newNumber,
      }
      // axios
      //   .post('http://localhost:3001/persons', person)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //   })
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    } else {
      if (find.number !== newNumber && window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`)))
        personService.update(find.id, {...find, number: newNumber}).then(() => {
          personService
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
        })
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

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name} ?`))
      personService.remove(person.id).then(() => {
        personService
        .getAll()
        .then(initialPersons => setPersons(initialPersons))
      })
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
      
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete} />
    </div>
  )
}

export default App