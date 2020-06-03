const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    { title: "React patterns", author: "Michael Chan", user: "5ed16ed5f0276267c400ccce", url: "https://reactpatterns.com/", likes: 7, id: "5a422a851b54a676234d17f7" },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", user: "5ed16ed5f0276267c400ccce", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, id: "5a422aa71b54a676234d17f8" },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", user: "5ed16ed5f0276267c400ccce", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, id: "5a422b3a1b54a676234d17f9" }, 
    { title: "First class tests", author: "Robert C. Martin", user: "5ed16ed5f0276267c400ccce", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, id: "5a422b891b54a676234d17fa" }, 
    { title: "TDD harms architecture", author: "Robert C. Martin", user: "5ed16ed5f0276267c400ccce", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, id: "5a422ba71b54a676234d17fb" }, 
    { title: "Type wars", author: "Robert C. Martin", user: "5ed16ed5f0276267c400ccce", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, id: "5a422bc61b54a676234d17fc" }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "Will remove this soon", author: "Juhana Kuparinen", url: "https://reactpatterns.com/", likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}