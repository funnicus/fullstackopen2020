  const initialState = ''
  
  const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_VOTED_ANECDOTE':
        return action.anecdote
      default:
        return state
    }
  }
  
  export const votedAnecdote = anecdote => {
    return {
      type: 'SET_VOTED_ANECDOTE',
      anecdote
    }
  }
  
  export default notificationReducer