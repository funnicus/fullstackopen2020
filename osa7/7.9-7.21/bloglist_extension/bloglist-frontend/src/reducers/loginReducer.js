const initialState = { username: '', password: '' }
  
const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USERNAME':
      return { username: action.username, password: state.password }
    case 'SET_PASSWORD':
      return { username: state.username, password: action.password }
    default:
      return state
  }
}

export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        username
    }
}

export const setPassword = (password) => {
    return {
        type: 'SET_PASSWORD',
        password
    }
  }

export default loginReducer