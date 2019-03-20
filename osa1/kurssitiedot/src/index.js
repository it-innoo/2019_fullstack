import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Total = (props) => {
    return (
        <p>Yhteensä {props.count}</p>
    )
}

const Part = (props) => {
  <p>{props.part} {props.num}</p>
}

const Content = (props) => {
    return (
      <div>
        <Part part={props.part1} num={props.exercises1}/>
      </div>
    )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      
      <Content part={part1} num={exercises1}/>
      <Content part={part2} num={exercises2}/>
      <Content part={part3} num={exercises3}/>
      
      <Total count={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))