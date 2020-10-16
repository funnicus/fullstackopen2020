import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {

  const [name, setName] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState(null)

  const [booksByGenre, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if (data && data.allBooks) setFilteredBooks(data.books)
  }, [loading, data])

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading || loading) return <div>Loading...</div>
  console.log(result)
  const books = result.data.allBooks
  const genres = [...new Set(books.map(b => b.genres).flat(1))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {(filteredBooks ?
            filteredBooks.filter(b => b.genres.indexOf(name) > -1 || name === 'all') :
            books.filter(b => b.genres.indexOf(name) > -1 || name === 'all')).map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      <h3>Choose genre</h3>
      <form>
        <label>
          Pick genre
          <select value={name} onChange={({ target }) => {
            setName(target.value)
            booksByGenre({ variables: { genre: target.value } })
          }}>
            <option key={'all'} value={'all'}>{'all'}</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>
      </form>
    </div>
  )
}

export default Books