import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [reset, {
    type,
    value,
    onChange
  }]
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => setResources(response.data))
  }
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    const updatedResources = resources.concat(response.data)
    setResources(updatedResources)
    return response.data
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl } /${id}`, newObject)
    return request.then(response => response.data)
  }

  const service = {
    getAll,
    create,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const [resetContent, content] = useField('text')
  const [resetName, name] = useField('text')
  const [resetNumber, number] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    resetContent()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App