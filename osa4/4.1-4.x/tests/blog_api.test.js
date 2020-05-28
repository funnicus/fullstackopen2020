const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])  
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])  
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])  
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[3])  
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[4])  
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[5])  
    await blogObject.save()
})

describe('Get works', () => {
    test('blogs are returned as json...', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Correct id-name', () => {
    test('Every blog has the correct name for their identifying field', async () => {
        const result = await api
                        .get('/api/blogs')
                        .expect(200)
                        .expect('Content-Type', /application\/json/)
        for(let i = 0; i < result.length; i++){
            expect(Object.keys(result[i]).indexOf('id')).toBeGreaterThan(-1)
        }
    })
})

describe('Post', () => {

    let newBlog = {
        "title": "Hmmmm",
        "author": "Juhana Kuparinen",
        "url": "http://localhost:3003/api/blogs",
        "likes": 0
    }

    test('Post works', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        //Is there a new blog?
        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
    test('Empty likes field gets a value zero...', async () => {
        newBlog = {
            "title": "Zero test",
            "author": "Juhana Kuparinen",
            "url": "http://localhost:3003/api/blogs"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })
    test('Response with status 400, if title or url are missing...', async () => {
        newBlog = {
            "author": "Juhana Kuparinen"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('Delete', () => {
    test('Delete works', async () => { 
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Put', () => {

    let newBlog = {
        "title": "juuu u",
        "author": "Juhana Kuparinen",
        "url": "http://localhost:3003/api/blogs",
        "likes": 8
    }

    test('Put works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].title).toBe("juuu u")
    })
    test('Response with status 400, if title or url are missing...', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        newBlog = {
            "author": "Juhana Kuparinen"
        }
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})