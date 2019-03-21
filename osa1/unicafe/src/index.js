import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [ugly, setUgly] = useState(0)

  return (
    <div>
      <h3>Anna palautetta</h3>
      <div>
        <button onClick={() => setGood(good + 1)}>
          hyvä
        </button>
        <button onClick={() => setUgly(ugly + 1)}>
          neutraali
        </button>
        <button onClick={() => setBad(bad + 1)}>
          huono
        </button>
      </div>
      <div>
        <h3>Statistiikka</h3>
          <p>
            hyvä: {good}
          </p>
          <p>
            neutraali: {ugly}
          </p>
          <p>
            huono: {bad}
          </p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)