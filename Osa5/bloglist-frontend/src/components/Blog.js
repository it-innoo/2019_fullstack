import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const user = window
    .localStorage
    .getItem('loggedinUser')

  const handleLikes = (event) => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes += 1 }
    try {
      blogService.like(likedBlog.id, likedBlog)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`remove blog ${blog.title}`)) {
        blogService.remove(blog.id)
      }
    } catch (error) {
      console.log('error is: ', error)
    }
  }

  return (
    <article className="blog">

      <details>
        <summary>
          <mark>
            {blog.title} {blog.author}
          </mark>
        </summary>
        <a href={blog.url} rel="noopener noreferrer" target="_blank">
          {blog.url}
        </a>
        <p>
          {blog.likes} tykkäystä
          <button onClick={handleLikes}>
            like
          </button>
        </p>
        <p>
          Added by {blog.user[0].name}
        </p>
        {user && JSON.parse(user).name === blog.user[0].name ?
          <button onClick={handleRemove}>
            remove
          </button> :
          <p></p>
        }
      </details>

    </article >
  )

}

export default Blog