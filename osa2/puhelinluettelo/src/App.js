import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showNames, setShowNames ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }

    if (persons.some(p => p.name === personObject.name)) {
      alert(`${personObject.name} on jo luttelossa`)
    } else {
      //setPersons(persons.concat(personObject))
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
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
      <Filter
        value={showNames}
        onChangeHandler={handleFilter}
      />

      <h3>Lisää uusi</h3>
      <PersonForm
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        submitHandler={addPerson}
      />

      <h3>Numerot</h3>
      <Persons
        persons={persons}
        showNames={showNames}
      />
    </div>
  )
}

export default App;
