/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, removeBlog, likeBlog, comment, handleCommentChange, handleCommenting }) => {

  if(!blog) return null

  // Testit ei toimi ilman tätä...
  if(!localStorage.loggedBlogappUser){
    const user = { username: 'Test' }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const commenting = event => {
    event.preventDefault()
    handleCommenting(blog.id, comment)
  }

  const userInfo = JSON.parse(localStorage.loggedBlogappUser)

  const comments = blog.comments.map(c => <li key={c}>{c}</li>)

  return (
    <div>
        <h2>{blog.title} by: {blog.author} </h2>
        <ul style={{ listStyle: 'none' }}>
          <li>
            {blog.url}
          </li>
          <li>
            {blog.likes}<button className='likeBlog' onClick={() => likeBlog(blog.id)}>Like</button>
          </li>
          <li>
            Added by: {blog.user ? blog.user.name : 'User not available...'}
          </li>
          <li>
            {blog.user && (userInfo.username === blog.user.username) ? <button id='removeBlog' onClick={() => removeBlog(blog.id)}>remove blog</button> : ''}
          </li>
        </ul>
        <h3>Comments:</h3>
        <form onSubmit={commenting}>
          <div className='comment-field'>
            <input 
            type='comment'
            id='comment'
            value={comment}
            name='Comment'
            placeholder='...' 
            onChange={e => handleCommentChange(e)} />
            <button type='submit'>Add comment</button>
          </div>
        </form>
          <ul>
            {comments}
          </ul>
    </div>
  )
}

export default Blog
