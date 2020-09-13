import React from 'react'
import {
  Button,
  TextField
} from '@material-ui/core'
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
          <TextField
            label='Title'
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={e => handleTitleChange(e)}
          />
        </div>
        <div>
          <TextField
            label='author'
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={e => handleAuthorChange(e)}
          />
        </div>
        <div>
          <TextField
            label='Url'
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={e => handleUrlChange(e)}
          />
        </div>
        <Button variant='contained' id='submit-blog' type="submit" >create</Button>
      </form>
    </div>
  )}

export default CreateBlogForm