import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [role, setRole] = useState('alert-error')

  useEffect(() => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedinUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('bad credentials')
      setMessage('wrong username and password')
      setRole('alert alert-error')
      setTimeout(() => {
        setMessage(null)
        setUsername('')
        setPassword('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setMessage(`${user.name} logged out`)
    setRole('alert-info')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setUser(null)
  }


  const blogForm = () => {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button className="btn-logout" onClick={handleLogout}>
          logout
        </button>
        <Blogs />
      </div>
    )
  }

  const loginForm = () => {

    return (

      <fieldset>
        <legend>log in to application</legend>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              id="username"
              name="username"
              placeholder="Username"
              required
              autoFocus
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              name="password"
              placeholder="Password"
              required
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </fieldset>
    )
  }

  return (
    <div>
      <header>
        <h1>Blogi lista</h1>
      </header>
      <Notification
        message={message}
        className={role}
      />
      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App
