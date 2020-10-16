import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
    }
    genres
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{
        name
        born
      }
      published
      genres
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!){
    addBook (
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      id
      author {
        name
        born
      }
      genres
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!){
    allBooks(genre: $genre) {
      title
      author{
        name
        born
      }
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`
export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $born: Int!){
    editAuthor (
      name: $name,
      born: $born
    ) {
      name
      born
      bookCount
    }
  }
`
export const BOOK_ADDED = gql`  
subscription {    
  bookAdded {      
    ...BookDetails    
  }  
}  ${BOOK_DETAILS}`