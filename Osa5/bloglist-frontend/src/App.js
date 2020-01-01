import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
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

    username = event.target.username.value
    password = event.target.password.value

    setUsername(username)
    setPassword(password)

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
        onSubmit={handleLogin}
        onClick={handleLogout}
      />

      <Blogs></Blogs>
    </div>
  )
}

export default App
