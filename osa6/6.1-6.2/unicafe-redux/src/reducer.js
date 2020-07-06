const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newVotes
  switch (action.type) {
    case 'GOOD':
      console.log(state)
      newVotes = { ...state }
      newVotes.good++
      return newVotes
    case 'OK':
      console.log(state)
      newVotes = { ...state }
      newVotes.ok++
      return newVotes
    case 'BAD':
      newVotes = { ...state }
      newVotes.bad++
      return newVotes
    case 'ZERO':
      console.log(state)
      return initialState
    default: return state
  }
  
}

export default counterReducer