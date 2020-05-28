const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).json({ 
      error: 'Title or url missing' 
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: typeof body.likes === 'number' ? body.likes : 0 
  })
  
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).json({ 
      error: 'Title or url missing' 
    })
  }
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter