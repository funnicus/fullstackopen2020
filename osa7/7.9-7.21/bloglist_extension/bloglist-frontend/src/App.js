import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { setUsername } from './reducers/loginReducer'
import { setPassword } from './reducers/loginReducer'
import { likeOneBlog, createBlog, deleteBlog, initializeBlogs } from './reducers/blogsReducer'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {

  const dispatch = useDispatch()

  
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.loginForm.username)
  const password = useSelector(state => state.loginForm.password)
  
  const handleUsernameChange = e => dispatch(setUsername(e.target.value))
  const handlePasswordChange = e => dispatch(setPassword(e.target.value))
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = id => dispatch(likeOneBlog(id))

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Logged in!', 'message', 5000))
    } catch (exception) {
      dispatch(setNotification('wrong credentials...', 'errorMessage', 5000))
    }
  }

  const handleLogout = (event) => {
    dispatch(setNotification('Logged out!', 'message', 5000))
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`Blog named "${blogObject.title}", by ${blogObject.author} was created!`, 'message', 5000))
  }

  const removeBlog = async ( id ) => {
    if(window.confirm('Do you really want to delete this blog?')){
      try{
        dispatch(deleteBlog(id))
        dispatch(setNotification('Removed', 'message', 5000))
      }
      catch(error){
        console.log(error)
        dispatch(setNotification('unauthorized', 'errorMessage', 5000))
      }
    }
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        /> :
        <div>
          <div>
            <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='create a blog'>
            <CreateBlogForm
              handleCreate={handleCreate}
            />
          </Togglable>

          <BlogList blogs={blogs} removeBlog={removeBlog} likeBlog={likeBlog} />
        </div>
      }
    </div>
  )
}

export default App