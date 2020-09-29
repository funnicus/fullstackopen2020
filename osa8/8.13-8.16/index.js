require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const { v1: uuid } = require('uuid')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const authors = Author.find({})
const books = Book.find({})

const typeDefs = gql`
  type Author {
      name: String!
      id: String!
      born: Int
      bookCount: Int!
  }

  type Book {
      title: String!
      published: Int!
      author: String!
      id: String!
      genres: [String]!
  }

  type Mutation {
      addBook(
          title: String!
          published: Int!
          author: String!
          genres: [String]!
      ): Book
      editAuthor(
          name: String!
          born: Int
      ): Author
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: (root, args) => {
          if(args.author && args.genre) {
            return books.filter(b => {
              return (b.author === args.author) && (b.genres.find(g => g === args.genre) !== undefined)
            })
          }
          else if (args.author) return books.filter(b => b.author === args.author)
          else if (args.genre) return books.filter(b => b.genres.find(g => g === args.genre))
          else {
            return Book.find({})
          }
      },
      allAuthors: () => Author.find({})
  },
  Author: {
      bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
      addBook: (root, args) => {
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        if(authors.find(a => book.author === a.name) === undefined){
            authors = authors.concat({ name: book.author, id: uuid(), born: null })
        }
        return book
      },
      editAuthor: (root, args) => {
        const author = authors.find(a => args.name === a.name)
        if(author){
            authors = authors.map(a => a.name === args.name ? { ...a, born: args.born } : a)
            author.born = args.born
            return author
        }
        else return null
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})