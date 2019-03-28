import React from 'react'

const Header = ({ course }) => {
	return (
			<h1>{course.name}</h1>
	)
}

const Total = ({ parts }) => {
const total = parts.reduce((summa, part) => 
	summa + part.exercises, 0);

	return (
			<p>Yhteensä {total} tehtävää</p>
	)
}

const Part = ({ parts }) => {
const rows = () =>
	parts.map(
	part =>
	 <p key={part.id}>{part.name} {part.exercises}</p>
)

return (
	<section>
		{rows()}
	</section>
)
}

const Content = ({ parts }) => {
console.log('Content toimii... ', parts)
	return (
		<Part parts={parts} />
	)
}

const Course = ({ course }) => {
console.log('in Course', course)
return (
	<div>
		<Header course={course}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>
	</div>
	)
}

export default Course

