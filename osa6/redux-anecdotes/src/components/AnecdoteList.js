import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (event) => {

    store.dispatch(
      voteAnecdote(event)
    )
  }

  return (
    <ul className="list-group">
      {
        anecdotes
          .sort((a, b) => a.votes < b.votes)
          .map(anecdote =>
            <li key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </li>
          )
      }
    </ul>
  )
}

export default AnecdoteList