import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import blogFormReducer from './reducers/blogFormReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  loginForm: loginReducer,
  blogForm: blogFormReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store