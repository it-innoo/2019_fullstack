import React from 'react'

const Filter = (props) => {
    return (
      <div>
        Rajaa näytettäviä
        <input
          value={props.namesToShow}
          onChange={props.onChangeHandler}
        />
      </div>
    )
}

export default Filter
