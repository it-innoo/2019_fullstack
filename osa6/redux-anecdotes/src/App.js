import React from 'react';

const App = ({ store }) => {
  const anecdotes = store.getState()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value

    store.dispatch({
      type: 'ADD',
      content: content
    })
  }

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE',
      id: id
    })
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