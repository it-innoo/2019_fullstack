import React from 'react'

const Button = ({ store, type, text }) => {
  return (
    <button onClick={e => store.dispatch({ type })}>
      {text}
    </button>
  )
}
const Feedback = ({ store }) => {
  return (
    <section>
      <header>
        <h3>Give Feedback</h3>
      </header>
      <Button
        store={store}
        type='GOOD'
        text='Hyvä'
      />
      <Button
        store={store}
        type='OK'
        text='Neutraali'
      />
      <Button
        store={store}
        type='BAD'
        text='Huono'
      />
      <Button
        store={store}
        type='ZERO'
        text='Nollaa tilastot'
      />
    </section>
  )
}

const Statistic = ({ text, value }) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ store }) => {
  const aggregate = [
    store.getState().good,
    store.getState().ok,
    store.getState().bad
  ]

  const total = aggregate
    .reduce((a, b) => a + b, 0)

  if (total === 0) {
    return (
      <section>
        <header>
          <h3>Statistics</h3>
          <div>No feedback given</div>
        </header>
      </section>
    )
  }

  const average =
    (aggregate[0] - aggregate[2]) / total

  const positive =
    100 * aggregate[0] / total + " %"
  return (
    <section>
      <header>
        <h3>Statistics</h3>
        <table>
          <Statistic text='Hyvä' value={aggregate[0]} />
          <Statistic text='Neutraali' value={aggregate[1]} />
          <Statistic text='Huono' value={aggregate[2]} />
          <Statistic text='Yhteensä' value={total} />
          <Statistic text='Keskiarvo' value={average} />
          <Statistic text='Positiivisia' value={positive} />
        </table>
      </header>
    </section>
  )
}

const App = ({ store }) => {

  return (
    <div>
      <Feedback store={store} />
      <Statistics store={store} />
    </div>
  )

}

export default App