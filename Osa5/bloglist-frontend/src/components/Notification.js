import React from 'react'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className} role="alert">
      {message}
    </div>
  )
}


export default Notification
