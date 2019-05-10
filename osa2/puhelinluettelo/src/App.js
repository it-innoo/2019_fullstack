import React, { useState, useEffect } from 'react';

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showNames, setShowNames ] = useState('')
  const [ noteMessage, setNoteMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(allNames => {
        setPersons(allNames)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    console.log('addPerson toimii,,, ', event.target)

    event.preventDefault()
    const personObject = {
      name : newName,
      number : newNumber
    }

    const person = persons.find(p => p.name === personObject.name)
    if (person !== undefined) {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changed = { ...person, number: newNumber}
        
        personService
          .update(person.id, changed)
          .then(returnedPerson => {
            const index = person.index
            persons[index] = personObject
            setPersons(persons)
            
            setNoteMessage(`Muokattiin ${person.name}`)
            setTimeout(() => {
              setNoteMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
      } else {
        console.log('addPerson create oimii,,, ', person)
        personService
          .create(personObject)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNoteMessage(`Lisättiin ${newPerson.name}`)
            setTimeout(() => {
              setNoteMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
        })
      
    }

  }

  const handleDelete = (id) => (event) => {
    
    personService
      .getOne(id)
      .then(p => {
        if (window.confirm(`Poistetaanko ${p.name}`)) {
          personService.deleteOne(id)
          setNoteMessage(
            `${p.name} yhteystieto poistettu`
          )
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setNoteMessage(null)
          }, 5000)
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

  console.log('App toimii...')
  return (
    
    <div className="app">
      <h2>Puhelinluettelo</h2>
      
      <Notification message={noteMessage} />

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
        <ul>
        <Persons
          persons={persons}
          showNames={showNames}
          onClickHandler = {handleDelete}
        />
        </ul>
    </div>
  )
}

export default App;
