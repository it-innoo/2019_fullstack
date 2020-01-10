import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {

  const vote = (event) => {
    const anecdote = props.anecdotes.find(a => a.id === event)

    props.dispatch(
      setMessage(`You voted '${anecdote.content}'`)
    )

    props.dispatch(
      voteAnecdote(event)
    )

    setTimeout(() => {
      props.dispatch(
        clearMessage()
      )

    }, 5000)
  }

  console.log('filter now: ', props.filter)

  return (

    <ul className="list-group">
      {

        props.anecdotes
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

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log('List state: ', state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(AnecdoteList)