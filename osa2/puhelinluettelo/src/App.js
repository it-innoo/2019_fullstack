import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
    {
      name: 'Jukka Ahlgren',
    },
  ]) 
  const [ newName, setNewName ] = useState('')

  const rows = () => persons.map(person =>
    <p key={person.name}>
      {person.name}
    </p>
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: 
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>
        {rows()}
      </div>
    </div>
  )
}

export default App;
