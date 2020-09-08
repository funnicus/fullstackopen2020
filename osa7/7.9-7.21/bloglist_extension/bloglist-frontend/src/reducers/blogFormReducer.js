const initialState = { title: '', author: '', url: '' }
  
const blogFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.title }
    case 'SET_AUTHOR':
      return { ...state, author: action.author }
    case 'SET_URL':
        return {...state, url: action.url}
    default:
      return state
  }
}

export const setTitle = (title) => {
    return {
        type: 'SET_TITLE',
        title
    }
}

export const setAuthor = (author) => {
    return {
        type: 'SET_AUTHOR',
        author
    }
  }

export const setUrl = (url) => {
    return {
        type: 'SET_URL',
        url
    }
  }

export default blogFormReducer