import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogit => setBlogs(blogit))
  }, [])

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
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    console.log(`${user.name} logged out`)

    setUser(null)
  }

  const blogForm = () => {
    return (
      <section>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </section>
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
        <h1>Blogilista</h1>
      </header>

      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App;
