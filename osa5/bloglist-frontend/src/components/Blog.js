/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const likeBlog = async ( id ) => {
    const oldBlog = await blogService.getOne(id)
    const newBlog = { ...oldBlog }
    newBlog.likes++
    let newLikes = likes
    newLikes++
    setLikes(newLikes)
    await blogService.update(id, newBlog)
  }

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const userInfo = JSON.parse(localStorage.loggedBlogappUser)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {visible ? <button onClick={toggleVisibility}>show less...</button> : <button onClick={toggleVisibility}>show more...</button> }
      <div style={{ display: visible ? '' : 'none' }}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            {blog.url}
          </li>
          <li>
            {likes}<button onClick={() => likeBlog(blog.id)}>Like</button>
          </li>
          <li>
            {blog.user ? blog.user.name : 'User not available...'}
          </li>
          <li>
            {blog.user && userInfo.username === blog.user.username ? <button onClick={() => removeBlog(blog.id)}>remove blog</button> : ''}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
