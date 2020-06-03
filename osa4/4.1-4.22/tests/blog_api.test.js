const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

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
    test('Login and Post works', async () => {

        const loginInfo = {
            "username": "mluukkai",
            "password": "salainen"
        }

        const userInfo = await api
                        .post('/api/login')
                        .send(loginInfo)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

        console.log(userInfo.body.token)
        console.log(typeof userInfo.body.token)

        let newBlog = {
            "title": "Jest Test with tokens",
            "author": "Juhana Kuparinen",
            "url": "http://localhost:3003/api/blogs",
            "likes": 0
        }
        
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userInfo.body.token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        //Is there a new blog?
        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
    test('Empty likes field gets a value zero...', async () => {

        const loginInfo = {
            "username": "mluukkai",
            "password": "salainen"
        }

        const userInfo = await api
                        .post('/api/login')
                        .send(loginInfo)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

        let newBlog = {
            "title": "Hmmmm",
            "author": "Juhana Kuparinen",
            "url": "http://localhost:3003/api/blogs",
            "likes": 0
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userInfo.body.token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })
    test('Response with status 400, if title or url are missing...', async () => {

        const loginInfo = {
            "username": "mluukkai",
            "password": "salainen"
        }

        const userInfo = await api
                        .post('/api/login')
                        .send(loginInfo)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

        let newBlog = {
            "author": "Juhana Kuparinen"
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userInfo.body.token}`)
            .send(newBlog)
            .expect(400)
    })
})

describe('Delete', () => {
    test('Delete works', async () => { 

        const loginInfo = {
            "username": "mluukkai",
            "password": "salainen"
        }

        const userInfo = await api
                        .post('/api/login')
                        .send(loginInfo)
                        .expect(200)
                        .expect('Content-Type', /application\/json/)

        const newBlog = {
            "title": "Jest Test with tokens",
            "author": "Juhana Kuparinen",
            "url": "http://localhost:3003/api/blogs",
            "likes": 0
        }
        
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userInfo.body.token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[blogsAtStart.length - 1]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${userInfo.body.token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Put', () => {
    test('Put works', async () => {
        let newBlog = {
            "title": "Hmmmm",
            "author": "Juhana Kuparinen",
            "url": "http://localhost:3003/api/blogs",
            "likes": 0
        }

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].title).toBe("Hmmmm")
    })
    test('Response with status 400, if title or url are missing...', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        let newBlog = {
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