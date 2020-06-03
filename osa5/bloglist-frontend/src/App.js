import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)
  const [messageClassName, setMessageClassName] = useState("empty")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setMessageClassName("message")
      setMessage('Logged in!')
      setTimeout(() => {
        setMessage(null)
        setMessageClassName("empty")
      }, 5000)
    } catch (exception) {
      setMessageClassName("errorMessage")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
        setMessageClassName("empty")
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setMessageClassName("message")
    setMessage('Logged out!')
      setTimeout(() => {
        setMessage(null)
        setMessageClassName("empty")
      }, 5000)
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlogObj = { title: title, author: author, url: url }
    const returnedBlog = await blogService.create(newBlogObj)
    setBlogs(blogs.concat(returnedBlog))
    setMessageClassName("message")
    setMessage(`Blog named "${title}", by ${author} was created!`)
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => {
      setMessage(null)
      setMessageClassName("empty")
    }, 5000)
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
        <CreateBlogForm 
        handleCreate={handleCreate} 
        title={title} 
        handleTitleChange={handleTitleChange} 
        author={author} 
        handleAuthorChange={handleAuthorChange} 
        url={url} 
        handleUrlChange={handleUrlChange} 
        />
        <BlogList blogs={blogs}/>
      </div>
    }
    </div>
  )
}

export default App