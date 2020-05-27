const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Get works', () => {
    test('blogs are returned as json...', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
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
        await api
            .post('/api/blogs')
            .send({
                "title": "This is a JEST test",
                "author": "Juhana Kuparinen",
                "url": "http://localhost:3003/api/blogs",
                "likes": 0
            })
            .expect(201)
    })
})

afterAll(() => {
    mongoose.connection.close()
})