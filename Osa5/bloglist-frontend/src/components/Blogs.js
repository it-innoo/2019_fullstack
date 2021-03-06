import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogit => setBlogs(blogit))
  }, [])

  const blogFormRef = React.createRef()

  const addBlog = () => {
    blogService.getAll().then(blogit => setBlogs(blogit))
    blogFormRef.current.toggleVisibility()
  }

  const Header = () => {
    return (
      <header>
        <h2>Blogs</h2>
      </header>
    )

  }

  const user = window.localStorage.getItem('loggedinUser')

  if (user === null) {
    return (
      <main className="blogs"></main>
    )
  }

  return (
    <main className="blogs">
      <Header />
      <Togglable
        buttonLabel="New Blog"
        ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </main>

  )
}

export default Blogs