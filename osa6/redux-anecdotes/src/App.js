import React from 'react';

const App = ({ store }) => {
  const anecdotes = store.getState()
  console.log(anecdotes)

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      id: id
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App