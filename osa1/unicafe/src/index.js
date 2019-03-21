import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => <h3>{props.text}</h3>
const Tilasto = (props) => <p>{props.text}: {props.num}</p>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [ugly, setUgly] = useState(0)
  const HyvatPahatJaRumat = () => good + bad + ugly
  const Avg = (good + bad + ugly) / 3

  return (
    <div>
      <Otsikko text='Anna palautetta' />
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
        <Otsikko text='Statistiikka' />
          <Tilasto text="hyvä: " num={good} />
          <Tilasto text="neutraali: " num={ugly} />
          <Tilasto text="huono: " num={bad} />
          <Tilasto text="yhteensä: " num={good + bad + ugly} />

          <p>
            Keskiarvo: {Avg}
          </p>
          <p>
            Positiisia: {} %
          </p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)