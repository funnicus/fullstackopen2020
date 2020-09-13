import React from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = ({ blogs, removeBlog, likeBlog }) => {

  const sortedBlogList = blogs.sort((a, b) => b.likes - a.likes)
  const bloglist = sortedBlogList.map(blog => <TableRow key={blog.id} ><TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></TableCell><TableCell>{blog.author}</TableCell></TableRow>)

  return (
    <div>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {bloglist}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList