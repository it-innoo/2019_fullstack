import React, { useState } from 'react'

import Notification from './Notification'
import blogService from '../services/blogs'

const BlogForm = ({ onSubmit }) => {
  const [message, setMessage] = useState(null)
  const [role, setRole] = useState('alert-error')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

      onSubmit()
      setAuthor('')
      setTitle('')
      setUrl('')

      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setRole('alert-info')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage('Add a new blog failed!')
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


  return (
    <section>
      <Notification
        message={message}
        className={role}
      />

      <h2>blogs</h2>



      <div>
        <h2>Create new blog</h2>

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
      </div>

    </section>
  )
}

export default BlogForm