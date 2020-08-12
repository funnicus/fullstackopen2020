import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote} from './reducers/anecdoteReducer'
import { votedAnecdote } from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const AnecdoteForm = (props) => {

    const createNew = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.votedAnecdote(`You created anecdote: ${content}`, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    votedAnecdote,
}
  
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)