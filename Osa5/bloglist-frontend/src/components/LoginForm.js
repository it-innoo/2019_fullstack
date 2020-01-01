import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, onClick }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = JSON.parse(
    window.localStorage.getItem('loggedinUser')
  )

  if (user === null) {
    return (
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Log into application</legend>
          <p>
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
          </p>
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
        </fieldset>
      </form>
    )
  }

  return (
    <p>{user.name} logged in
      <button type="button" onClick={onClick}>
        logout
      </button>
    </p>

  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default LoginForm
