import React from 'react'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'

const Filter = (props) => {
    return (
      
        <InputGroup>
          <InputGroupAddon
            addonType="prepend">Rajaa näytettäviä
          </InputGroupAddon>
          <Input
            type="text"
            value={props.namesToShow}
            onChange={props.onChangeHandler}
          />
      </InputGroup>
    )
}

export default Filter
