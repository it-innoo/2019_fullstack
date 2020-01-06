import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import './App.css'

const App = () => {
  const username = useField('text')
  const password = useField('password')
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
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedinUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (error) {
      setMessage('wrong username and password')
      setRole('alert alert-error')
      setTimeout(() => {
        setMessage(null)
        username.reset()
        password.reset()
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


  const Header = () => {
    return (
      <header>
        <h1>Blogilista</h1>
      </header>
    )

  }

  return (
    <div>
      <Header></Header>
      <Notification
        message={message}
        className={role}
      />

      <LoginForm
        username={username}
        password={password}
        onSubmit={handleLogin}
        onClick={handleLogout}
      />

      <Blogs></Blogs>
    </div>
  )
}

export default App
