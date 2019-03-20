import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ text }) => <div>{text}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display text='<h2>anna palautetta</h2>'/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)