import React, { useState, useEffect } from 'react';
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showNames, setShowNames ] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(allNames => {
        setPersons(allNames)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }

    const person = persons.find(p => p.name === personObject.name)
    if (person !== null) {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changed = { ...person, number: newNumber}
        personService
          .update(person.id, changed)
          .then(returnedPerson => {
            //setPersons(persons.map(p => returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        return
      } else {
          setNewName('')
          setNewNumber('')
        return
      }
    }

    personService
      .create(personObject)
      .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
      })
  }

  const handleDelete = (id) => (event) => {
    
    personService
      .getOne(id)
      .then(p => {
        if (window.confirm(`Poistetaanko ${p.name}`)) {
          personService.deleteOne(id)
          setPersons(persons.filter(p => p.id !== id))
        }
        
      })
    
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
        onClickHandler = {handleDelete}
      />
    </div>
  )
}

export default App;
