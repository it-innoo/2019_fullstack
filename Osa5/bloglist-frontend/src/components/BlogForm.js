import React, { useState, useEffect } from 'react'

import Blog from './Blog'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [blogsVisible, setBlogsVisible] = useState(false)
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

  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }



  return (
    <section>
      <Notification
        message={message}
        className={role}
      />

      <h2>blogs</h2>

      <div style={hideWhenVisible}>
        <button onClick={() => setBlogsVisible(true)}>New Blog</button>
      </div>

      <div style={showWhenVisible}>
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
        <button onClick={() => setBlogsVisible(false)}>cancel</button>
      </div>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </section>
  )
}

export default BlogForm