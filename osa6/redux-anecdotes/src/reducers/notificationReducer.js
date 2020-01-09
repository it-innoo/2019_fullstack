const message = 'render here notification...'

const notificationReducer = (state = message, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return state
    case 'CLEAR_MESSAGE':
      return state
    default:
      return state
  }
}

export default notificationReducer