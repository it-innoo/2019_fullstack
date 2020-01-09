import React from 'react'

const Notification = ({ store }) => {
  const message = store.getState().messages
  console.log(`message: ${message}`)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification