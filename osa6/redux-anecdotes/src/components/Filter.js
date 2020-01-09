import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {

  const handleChange = (event) => {
    const c = event.target.value
    // input-kentän arvo muuttujassa event.target.value
    if (c.length) {
      setFilter(c)
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter