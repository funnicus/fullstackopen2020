  
import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const SET_BIRTHYEAR = gql`
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

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    const bornNum = Number(born)

    setBirthyear({ variables: { name, born: bornNum }  })

    setName('')
    setBorn('')
  }

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 5000  
  })

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>Loading...</div>
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          Pick author
          <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map(a => <option value={a.name}>{a.name}</option>)}
          </select>
        </label>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
          </form>

    </div>
  )
}

export default Authors
