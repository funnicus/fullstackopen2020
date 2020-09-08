const initialState = { message: '', style: null }
  
const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return { message: action.message, style: action.style}
    default:
      return state
  }
}

export const setNotification = (message, style, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
      style
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: '',
        style: null
      })
    }, time)
  }
}

export default notificationReducer