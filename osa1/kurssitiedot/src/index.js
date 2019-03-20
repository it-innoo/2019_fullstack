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
  console.log("Part: "); console.log(props)
  return (
    <p>{props.part} {props.num}</p>
  )
}

const Content = (props) => {
  console.log("Content: "); console.log(props)
    return (
      <div>
        <Part part={props.part} num={props.num}/>
      </div>
    )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }


  return (
    <div>
      <Header name={course}/>
      
      <Content part={part1.name} num={part1.exercises}/>
      <Content part={part2.name} num={part2.exercises}/>
      <Content part={part3.name} num={part3.exercises}/>
      
      <Total count={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))