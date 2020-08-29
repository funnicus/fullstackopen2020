import React from 'react'
import Blog from './Blog'
const BlogList = ({ blogs, removeBlog, likeBlog }) => {

  const sortedBlogList = blogs.sort((a, b) => b.likes - a.likes)
  const bloglist = sortedBlogList.map(blog => <Blog key={blog.id} blog={blog} removeBlog={removeBlog} likeBlog={likeBlog} />)

  return (
    <div>
      <h2>Blogs</h2>
      {bloglist}
    </div>
  )
}

export default BlogList