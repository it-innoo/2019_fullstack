import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }

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

  const show = () => {
    return (
      <div>
        <p onClick={handleClick}>
          {blog.title} {blog.author}
        </p>
      </div>
    )
  }

  const showAll = () => {

    const user = window
      .localStorage
      .getItem('loggedinUser')

    return (
      <div>
        <p onClick={handleClick}>
          {blog.title} {blog.author}
        </p>

        <div>
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
        </div>

      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {showDetails ?
        showAll() :
        show()
      }
    </div>
  )

}

export default Blog