import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [blogs, setBlogs] = useState([])

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    try {
      await blogService
        .create(newBlog)

      setAuthor('')
      setTitle('')
      setUrl('')

      blogService.getAll().then(blogit => setBlogs(blogit))

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setRole('alert-info')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage("Add a new blog failed!")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }


  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

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
      setMessage('wrong username and password')
      setTimeout(() => {
        setMessage(null)
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
      <section>
        <h2>blogs</h2>

        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <h2>create new</h2>

        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder='Blog title'
              autoFocus
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder='Blog author'
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            <label htmlFor="url">Url</label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder='Blog url'
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
        <ul>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
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
        <h1>Blogilista</h1>
      </header>

      <Notification message={message} className={role} />

      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App;
