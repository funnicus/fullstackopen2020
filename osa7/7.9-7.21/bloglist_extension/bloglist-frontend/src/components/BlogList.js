import React from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, removeBlog, likeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogList = blogs.sort((a, b) => b.likes - a.likes)
  const bloglist = sortedBlogList.map(blog => <div className='blog' style={blogStyle} key={blog.id} ><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></div>)

  return (
    <div>
      <h2>Blogs</h2>
      {bloglist}
    </div>
  )
}

export default BlogList