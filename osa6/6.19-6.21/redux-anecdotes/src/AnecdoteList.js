import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import { votedAnecdote } from './reducers/notificationReducer'
import { filter } from './reducers/filterReducer'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'

const AnecdoteList = (props) => {

  const filterVal = props.filterVal
  const sortedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = async (id, content) => {
    props.voteAnecdote(id)
    await props.votedAnecdote(`You voted: ${content}`, 5000)
  }

  const handleFilterChange = e => {
    return props.filter(e.target.value)
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

const mapStateToProps = (state) => {
  if(!state.filter) return { anecdotes: state.anecdotes, filter: state.filter }
  return {
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1),
    filterVal: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  votedAnecdote,
  filter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)