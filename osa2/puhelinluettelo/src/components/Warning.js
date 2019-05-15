import React from 'react'

const Warning = ({ message }) => {

    if (message === null) {
      return null
    }
  
    let clazz = 'error'
    return (
      <div className={clazz}>
        {message}
      </div>
    )
  }

  export default Warning