import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setTitle, setAuthor, setUrl } from '../reducers/blogFormReducer'

const CreateBlogForm = ({ handleCreate }) => {

  const dispatch = useDispatch()

  const title = useSelector(state => state.blogForm.title)
  const author = useSelector(state => state.blogForm.author)
  const url = useSelector(state => state.blogForm.url)

  const handleTitleChange = e => dispatch(setTitle(e.target.value))
  const handleAuthorChange = e => dispatch(setAuthor(e.target.value))
  const handleUrlChange = e => dispatch(setUrl(e.target.value))

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObj = { title: title, author: author, url: url }
    handleCreate(newBlogObj)
    dispatch(setTitle(''))
    dispatch(setAuthor(''))
    dispatch(setUrl(''))
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={e => handleTitleChange(e)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={e => handleAuthorChange(e)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={e => handleUrlChange(e)}
          />
        </div>
        <button id='submit-blog' type="submit">create</button>
      </form>
    </div>
  )}

export default CreateBlogForm