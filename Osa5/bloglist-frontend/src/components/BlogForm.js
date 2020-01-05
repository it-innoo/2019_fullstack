import React, { useState } from 'react'

import Notification from './Notification'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ onSubmit }) => {

  const [message, setMessage] = useState(null)
  const [role, setRole] = useState('alert-error')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    try {
      await blogService
        .create(newBlog)

      title.reset()
      author.reset()
      url.reset()

      onSubmit()
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
      title.reset()
      author.reset()
      url.reset()
    }
  }

  return (
    <section>
      <Notification
        message={message}
        className={role}
      />

      <form onSubmit={addBlog}>
        <fieldset>
          <legend>Create new blog</legend>
          <div>
            <label htmlFor="title">Title</label>
            <input
              {...title.fields()}
              id="title"
              name="title"
              placeholder='Blog title'
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              {...author.fields()}
              id="author"
              name="author"
              placeholder='Blog author'
            />
          </div>
          <div>
            <label htmlFor="url">Url</label>
            <input
              {...url.fields()}
              id="url"
              name="url"
              placeholder='Blog url'
            />
          </div>
          <button type="submit">create</button>
        </fieldset>
      </form>

    </section>
  )
}

export default BlogForm