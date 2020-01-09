import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = ({ store }) => {

  return (
    < div >
      <h2>Anecdotes</h2>
      <Notification store={store} />

      <Filter store={store} />
      <AnecdoteList store={store} />
      <AnecdoteForm store={store} />
    </div >
  )
}

export default App