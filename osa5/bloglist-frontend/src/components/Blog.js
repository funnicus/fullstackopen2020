/* eslint-disable linebreak-style */
import React, { useState } from 'react'

const Blog = ({ blog, removeBlog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Testit ei toimi ilman tätä...
  if(!localStorage.loggedBlogappUser){
    const user = { username: 'Test' }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const userInfo = JSON.parse(localStorage.loggedBlogappUser)
  console.log(blog.user)
  console.log(blog.user.name )
  console.log(blog.user ? blog.user.name : 'User not available...')
  console.log('==============')

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} {visible ? <button onClick={toggleVisibility}>show less...</button> : <button onClick={toggleVisibility}>show more...</button> }
      <div className='showMore' style={{ display: visible ? '' : 'none' }}>
        <ul style={{ listStyle: 'none' }}>
          <li>
            {blog.url}
          </li>
          <li>
            {blog.likes}<button className='likeBlog' onClick={() => likeBlog(blog.id)}>Like</button>
          </li>
          <li>
            {blog.user ? blog.user.name : 'User not available...'}
          </li>
          <li>
            {blog.user && (userInfo.username === blog.user.username) ? <button id='removeBlog' onClick={() => removeBlog(blog.id)}>remove blog</button> : ''}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog

/*
const likeBlog = async ( id ) => {
    const oldBlog = await blogService.getOne(id)
    const newBlog = { ...oldBlog }
    newBlog.likes++
    let newLikes = likes
    newLikes++
    setLikes(newLikes)
    await blogService.update(id, newBlog)
  }
*/
