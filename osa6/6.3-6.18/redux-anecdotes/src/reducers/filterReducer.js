const initialState = ''
  
const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER_ANECDOTE':
      return action.filter
    default:
      return state
  }
}

export const filter = filter => {
  return {
    type: 'FILTER_ANECDOTE',
    filter
  }
}

export default filterReducer