import React, { useState } from 'react';
import Persons from './components/Persons'


const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showNames, setShowNames ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }

    if (persons.some(p => p.name === personObject.name)) {
      alert(`${personObject.name} on jo luttelossa`)
    } else {
      setPersons(persons.concat(personObject))
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setShowNames(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

        <div>
          rajaa näytettäviä
          <input
            value={showNames}
            onChange={handleFilter}
          />
        </div>

      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          numero:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>

      <h3>Numerot</h3>

      <Persons
        persons={persons}
        showNames={showNames}
      />
    </div>
  )
}

export default App;
