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
    test('Post works', async () => {
        const before = await api.get('/api/blogs')

        await api
            .post('/api/blogs')
            .send({
                "title": "Hmmmm",
                "author": "Juhana Kuparinen",
                "url": "http://localhost:3003/api/blogs",
                "likes": 666
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const after = await api.get('/api/blogs')

        console.log(after.body)

        //Is there a new blog?
        const blogsAtEnd = await helper.blogsInDb()  
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})