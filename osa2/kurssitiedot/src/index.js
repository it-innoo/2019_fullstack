import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = (props) => {
    return (
        <p>Yhteensä {props.count}</p>
    )
}

const Part = ({ parts }) => {
  return (
		<div>
			{parts.map(
				part =>
				 <p key={part.id}>{part.name} {part.exercises}</p>
				)
			}
		</div>
		
  )
}

const Content = ({ parts }) => {
	console.log('Content toimii... ', parts)
    return (
			<div>
			<Part parts={parts} />
			</div>
    )
}

const Course = ({ course }) => {
	console.log('in Course', course)
	return (
		<div>
			<Header course={course}/>
      <Content parts={course.parts}/>
      
		</div>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
				exercises: 10,
				id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
				exercises: 7,
				id: 2
      },
      {
        name: 'Komponenttien tila',
				exercises: 14,
				id: 3
			},
			{
        name: 'Redux',
				exercises: 7,
				id: 4
      }
    ]
  }


  return (
		<Course course={course} />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))