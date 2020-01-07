const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let updated = {}

  switch (action.type) {
    case 'GOOD':
      updated = { ...state }
      updated.good++
      return updated
    case 'OK':
      updated = { ...state }
      updated.ok++
      return updated
    case 'BAD':
      updated = { ...state }
      updated.bad++
      return updated
    case 'ZERO':
      updated = { ...state }
      updated.bad = 0
      updated.good = 0
      updated.ok = 0
      return updated
    default: return state
  }

}

export default counterReducer