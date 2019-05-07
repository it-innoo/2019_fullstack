import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.submitHandler}>
        <div>
          Nimi: 
          <input
            value={props.name}
            onChange={props.onNameChange}
          />
        </div>
  
        <div>
          numero:
          <input
            value={props.number}
            onChange={props.onNumberChange}
          />
        </div>
  
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
}

export default PersonForm
