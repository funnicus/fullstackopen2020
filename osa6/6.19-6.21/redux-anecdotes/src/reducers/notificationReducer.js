  const initialState = ''
  let id = undefined
  
  const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_VOTED_ANECDOTE':
        return action.anecdote
      default:
        return state
    }
  }
  
  export const votedAnecdote = (anecdote, time) => {
    clearTimeout(id)
    return async dispatch => {
      dispatch({
        type: 'SET_VOTED_ANECDOTE',
        anecdote,
      })
      id = setTimeout(() => {
        dispatch({
          type: 'SET_VOTED_ANECDOTE',
          anecdote: '',
        })
      }, time)
    }
  }
  
  export default notificationReducer