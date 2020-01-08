import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { voteAnecdote }
  from './reducers/anecdoteReducer'

const App = ({ store }) => {
  const anecdotes = store.getState()

  const vote = (event) => {

    store.dispatch(
      voteAnecdote(event)
    )
  }


  return (
    < div >
      <h2>Anecdotes</h2>
      {
        anecdotes
          .sort((a, b) => a.votes < b.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
      }
      <AnecdoteForm store={store} />
    </div >
  )
}

export default App