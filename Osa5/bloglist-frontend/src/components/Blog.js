import React, { useState } from 'react'

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
            <button>
              like
            </button>
          </p>
          <p>
            Added by {blog.user[0].name}
          </p>
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