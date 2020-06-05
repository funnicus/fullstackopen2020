import React, { useState } from 'react'

const CreateBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObj = { title: title, author: author, url: url }
    handleCreate(newBlogObj)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={e => handleTitleChange(e)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={e => handleAuthorChange(e)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={e => handleUrlChange(e)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}

export default CreateBlogForm