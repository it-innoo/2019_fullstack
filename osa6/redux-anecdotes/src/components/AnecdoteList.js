import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()


  const vote = (event) => {
    const anecdote = anecdotes.find(a => a.id === event)

    store.dispatch(
      setMessage(`You voted '${anecdote.content}'`)
    )

    store.dispatch(
      voteAnecdote(event)
    )

    setTimeout(() => {
      store.dispatch(
        clearMessage()
      )

    }, 5000)
  }

  console.log('filter now: ', store.getState())

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