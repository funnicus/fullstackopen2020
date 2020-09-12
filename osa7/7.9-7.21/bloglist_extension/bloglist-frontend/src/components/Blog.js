/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, removeBlog, likeBlog }) => {

  if(!blog) return null

  // Testit ei toimi ilman tätä...
  if(!localStorage.loggedBlogappUser){
    const user = { username: 'Test' }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const userInfo = JSON.parse(localStorage.loggedBlogappUser)

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
    </div>
  )
}

export default Blog
