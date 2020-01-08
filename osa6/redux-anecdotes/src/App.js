import React from 'react'
import { createAnecdote, voteAnecdote }
  from './reducers/anecdoteReducer'

const App = ({ store }) => {
  const anecdotes = store.getState()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value

    store.dispatch(createAnecdote(content))
    event.target.content.value = ''
  }

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
      < h2 > create new</h2 >
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}

export default App