import React from 'react'

const Notification = ({ message }) => {

    if (message === null) {
      return null
    }
  
    let clazz = 'note'
    return (
      <div className={clazz}>
        {message}
      </div>
    )
  }

  export default Notification