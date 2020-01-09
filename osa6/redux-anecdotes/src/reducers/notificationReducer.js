//const message = 'render here notification...'

const notificationReducer = (state = null, action) => {

  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return null
    default:
      return state
  }
}

export const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    message: message
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
    message: null
  }
}

export default notificationReducer