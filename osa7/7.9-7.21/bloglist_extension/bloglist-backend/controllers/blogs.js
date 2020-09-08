const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

blogsRouter.use(middleware.tokenExtractor)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)  
  if (!request.token || !decodedToken.id) {    
    return response.status(401).json({ error: 'token missing or invalid' })  
  }  

  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url){
    return response.status(400).json({ 
      error: 'Title or url missing' 
    })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: typeof body.likes === 'number' ? body.likes : 0 
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  console.log(savedBlog)

  response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)  
    if (!request.token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if(blog.user._id.toString() === user.id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    else{
      response.status(401).json( { error: 'No permission' })
    }
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
  
  try{
    const blog = {
      title: body.title,
      author: body.author,
      user: body.user,
      url: body.url,
      likes: body.likes
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog.toJSON())
  }
  catch(err){
    console.log(err)
  }
})

module.exports = blogsRouter