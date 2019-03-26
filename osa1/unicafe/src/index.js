import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => <h3>{props.text}</h3>
const Statistics = (props) => {
  if (props.good + props.bad + props.ugly === 0) {
    return <p>Ei yhtään palautetta annettu</p>
  }

  return (
    <div>
      <p>hyvä {props.good}</p>
      <p>neutraali {props.ugly}</p>
      <p>huono {props.bad}</p>
      <p>yhteensä {props.good + props.bad + props.ugly}</p>
      <p>keskiarvo {(props.good - props.bad)/(props.good + props.bad + props.ugly)}</p>
      <p>positiivisia {100 * props.good/(props.good + props.bad + props.ugly)} %</p>
    </div>
  )
}

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
        <Statistics good={good} bad={bad} ugly={ugly} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)