import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import { votedAnecdote } from './reducers/notificationReducer'
import { filter } from './reducers/filterReducer'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if(!filter) return anecdotes
    return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  })
  const filterVal = useSelector(state => state.filter)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = async (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(votedAnecdote(`You voted: ${content}`, 5000))
  }

  const handleFilterChange = e => {
    return dispatch(filter(e.target.value))
  }

  return (
    <div>
      <Filter filterVal={filterVal} handleFilterChange={handleFilterChange} />
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList