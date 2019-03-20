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
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header name={course}/>
      
      <Content part={parts[0].name} num={parts[0].exercises}/>
      <Content part={parts[1].name} num={parts[1].exercises}/>
      <Content part={parts[2].name} num={parts[2].exercises}/>
      
      <Total count={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))