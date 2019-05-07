import React from 'react'

const Person = ( {person} ) => {
    return (
      <li>
        {person.name} {person.number}
      </li>
    )
  }
  
const Persons = ( {persons,showNames} ) => {
    return persons
      .filter(person => 
        person.name.toLowerCase().startsWith(showNames))
      .map(person =>
        <Person
          key={person.name}
          person={person}
        />
      )
}

  
export default Persons