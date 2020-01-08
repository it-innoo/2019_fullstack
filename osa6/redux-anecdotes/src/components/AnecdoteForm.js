import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'



const AnecdoteForm = ({ store }) => {
  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value

    store.dispatch(createAnecdote(content))
    event.target.content.value = ''
  }

  return (
    <form onSubmit={add}>
      <fieldset>
        <legend>Create new anecdote</legend>

        <div><input name="content" /></div>
        <button type="submit">create</button>
      </fieldset>
    </form>
  )
}

export default AnecdoteForm