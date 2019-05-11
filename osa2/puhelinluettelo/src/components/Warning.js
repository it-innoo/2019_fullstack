import React from 'react'

const Warning = ({ message }) => {
    console.log('Warning messahe: ', message)
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