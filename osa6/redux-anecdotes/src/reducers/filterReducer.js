const filter = ''

const filterReducer = (state = filter, action) => {

  switch (action.type) {
    case 'SET_FILTER':
      console.log('New filter: ', filter)
      return filter + action.message
    case 'CLEAR_FILTER':
      return ''
    default:
      return state
  }
}

export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    filter: filter
  }
}

export const clearFilter = () => {
  return {
    type: 'CLEAR_FILTER',
    filter: ''
  }
}

export default filterReducer