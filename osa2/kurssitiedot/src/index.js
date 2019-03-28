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
  return (
    <p>{props.part} {props.num}</p>
  )
}

const Content = (props) => {
    return (
      <div>
        <Part part={props.part} num={props.num}/>
      </div>
    )
}

const Course = ({ course }) => {
	console.log('in Course', course)
	return (
		<div>
			<Header name={course.name}/>
      <Content part={course.parts[0].name} num={course.parts[0].exercises}/>
      <Content part={course.parts[1].name} num={course.parts[1].exercises}/>
      <Content part={course.parts[2].name} num={course.parts[2].exercises}/>
		</div>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }


  return (
		<Course course={course} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))