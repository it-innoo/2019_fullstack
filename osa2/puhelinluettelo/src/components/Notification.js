import React from 'react'

const Notification = ({ message }) => {
    console.log('Notification messahe: ', message)
    if (message === null) {
      return null
    }
  
    return (
      <div className="note">
        {message}
      </div>
    )
  }

  export default Notification