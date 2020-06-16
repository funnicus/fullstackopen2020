import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messageClassName, setMessageClassName] = useState('empty')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  useEffect(() => {
    const fetchBlogs = async () => {
      const receivedBlogs = await blogService.getAll()
      setBlogs(receivedBlogs)
      console.log(receivedBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const likeBlog = async ( id ) => {
    const oldBlog = await blogService.getOne(id)
    const newBlog = { ...oldBlog }
    newBlog.likes++
    await blogService.update(id, newBlog)
    const updatedBlogList = await blogService.getAll()
    setBlogs(updatedBlogList)
  }

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
      setMessageClassName('message')
      setMessage('Logged in!')
      setTimeout(() => {
        setMessage(null)
        setMessageClassName('empty')
      }, 5000)
    } catch (exception) {
      setMessageClassName('errorMessage')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageClassName('empty')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setMessageClassName('message')
    setMessage('Logged out!')
    setTimeout(() => {
      setMessage(null)
      setMessageClassName('empty')
    }, 5000)
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    const updatedBlogList = await blogService.getAll()
    setBlogs(updatedBlogList)
    setMessageClassName('message')
    setMessage(`Blog named "${returnedBlog.title}", by ${returnedBlog.author} was created!`)
    setTimeout(() => {
      setMessage(null)
      setMessageClassName('empty')
    }, 5000)
  }

  const removeBlog = async ( id ) => {
    if(window.confirm('Do you really want to delete this blog?')){
      try{
        const newBlogList = await blogService.remove(id)
        setBlogs(newBlogList)
      }
      catch(error){
        console.log(error)
        setMessageClassName('errorMessage')
        setErrorMessage('unauthorized')
        setTimeout(() => {
          setErrorMessage(null)
          setMessageClassName('empty')
        }, 5000)
      }
    }
  }

  return (
    <div>
      <Notification message={errorMessage || message} messageClassName={messageClassName} />
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