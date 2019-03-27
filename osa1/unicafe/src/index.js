import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => <h3>{props.text}</h3>

const Statistic = (props) => {
  const { text, value } = props

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const {good, bad, ugly} = props

  if (good + bad + ugly === 0) {
    return <p>Ei yhtään palautetta annettu</p>
  }

  const summa = () => good + bad + ugly
  const keskiarvo = () =>
    (good - bad)/(good + bad + ugly)
  const positiivisia = () =>
    100 * good/(good + bad + ugly) + " %"

  return (
    <table>
      <tbody>
      <Statistic text="hyvä" value ={good} />
      <Statistic text="neutraali" value ={ugly} />
      <Statistic text="huono" value ={bad} />
      <Statistic text="yhteensä" value={summa()} />
      <Statistic text="keskiarvo" value={keskiarvo()} />
      <Statistic text="positiivisia" value={positiivisia()} />
      </tbody>
    </table>
  )
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
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
        <Button
          handleClick={() => setGood(good + 1)}
          text="hyvä"
        />
        <Button
          handleClick={() => setUgly(ugly + 1)}
          text="neutraali"
        />
        <Button
          handleClick={() => setBad(bad + 1)}
          text="huono"
        />
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