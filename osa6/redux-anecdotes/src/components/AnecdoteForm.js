import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

  const add = (event) => {
    event.preventDefault()
    const content = event.target.content.value

    store.dispatch(
      setMessage(`You added '${content}'`)
    )

    setTimeout(() => {
      store.dispatch(
        clearMessage()
      )

    }, 5000)
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