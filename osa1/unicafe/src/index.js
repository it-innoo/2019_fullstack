import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => <h3>{props.text}</h3>
const Tilasto = (props) => <p>{props.text}: {props.num}</p>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [ugly, setUgly] = useState(0)
  
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
          <Tilasto text="keskiarvo: " num={(good - bad)/(good + bad + ugly)} />
          <Tilasto text="positiivisia: " num={100 * good/(good + bad + ugly)} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)