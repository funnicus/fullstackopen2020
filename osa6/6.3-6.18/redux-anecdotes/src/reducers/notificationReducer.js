  const initialState = ''
  
  const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_VOTED_ANECDOTE':
        return action.anecdote
      default:
        return state
    }
  }
  
  export const votedAnecdote = (anecdote, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_VOTED_ANECDOTE',
        anecdote
      })
      setTimeout(() => {
        dispatch({
          type: 'SET_VOTED_ANECDOTE',
          anecdote: '',
        })
      }, time)
    }
  }
  
  export default notificationReducer