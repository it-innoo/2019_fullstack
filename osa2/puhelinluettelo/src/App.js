import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showNames, setShowNames ] = useState('')


  const rows = () => persons
    .filter(person => person.name.toLowerCase().startsWith(showNames))
    .map(person =>
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }

    console.log('lisätään: ' , personObject.name)
    console.log('onko olemassa: ' , persons.some(p => p.name === personObject.name))
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
    console.log(event.target.value)
    console.log(persons)
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
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App;
