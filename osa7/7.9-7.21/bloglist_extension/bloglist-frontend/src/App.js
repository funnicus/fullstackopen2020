import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core'

import { setNotification } from './reducers/notificationReducer'
import { setUsername } from './reducers/loginReducer'
import { setPassword } from './reducers/loginReducer'
import { likeOneBlog, createBlog, deleteBlog, commentOnBlog, initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'
import userService from './services/users'

import './App.css'

const App = () => {

  const dispatch = useDispatch()

  const [users, setUsers] = useState([])
  const [comment, setComment] = useState('')

  const loggedUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.loginForm.username)
  const password = useSelector(state => state.loginForm.password)

  const handleUsernameChange = e => dispatch(setUsername(e.target.value))
  const handlePasswordChange = e => dispatch(setPassword(e.target.value))
  const handleCommentChange = e => setComment(e.target.value)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await userService.getAll())
    }
    getUsers()
  }, [])

  const likeBlog = id => dispatch(likeOneBlog(id))

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
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
    dispatch(setUser(null))
  }

  const handleCreate = async (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`Blog named "${blogObject.title}", by ${blogObject.author} was created!`, 'message', 5000))
  }

  const removeBlog = async (id) => {
    if (window.confirm('Do you really want to delete this blog?')) {
      try {
        dispatch(deleteBlog(id))
        dispatch(setNotification('Removed', 'message', 5000))
      }
      catch (error) {
        console.log(error)
        dispatch(setNotification('unauthorized', 'errorMessage', 5000))
      }
    }
  }

  const handleCommenting = async (id, comment) => {
    try {
      dispatch(commentOnBlog(id, comment))
      dispatch(setNotification('Comment added!', 'message', 5000))
      setComment('')
    }
    catch (error) {
      console.log(error)
      dispatch(setNotification('comment error', 'errorMessage', 5000))
    }
  }

  const padding = {
    padding: 5
  }

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null
  
  return (
    <Container>
      <Notification />
      {loggedUser === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        /> :
        <div>
          <AppBar>
            <Toolbar>
              <IconButton edge='start' color='inherit' aria-label='menu'>
              </IconButton>
              <Button color='inherit' component={Link} to='/'>Home</Button>
              <Button color='inherit' component={Link} to='/blogs'>Blogs</Button>
              <Button color='inherit' component={Link} to='/users'>Users</Button>
              <em>{loggedUser.name} logged in</em>
              <Button color='inherit' onClick={handleLogout}>logout</Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path='/users/:id'>
              <User user={user} />
            </Route>
            <Route path='/blogs/:id'>
              <Blog blog={blog} removeBlog={removeBlog} likeBlog={likeBlog} comment={comment} handleCommentChange={handleCommentChange} handleCommenting={handleCommenting} />
            </Route>
            <Route path='/blogs'>
              <BlogList blogs={blogs} removeBlog={removeBlog} likeBlog={likeBlog} />
            </Route>
            <Route path='/users'>
              <UserList users={users} />
            </Route>
            <Route path='/'>
              <h2>Welcome to blog app {loggedUser.name}!</h2>
              <h3>Create a blog or browse existing ones!</h3>
              <Togglable buttonLabel='create a blog'>
                <CreateBlogForm
                  handleCreate={handleCreate}
                />
              </Togglable>
            </Route>
          </Switch>
        </div>
      }
    </Container>
  )
}

export default App