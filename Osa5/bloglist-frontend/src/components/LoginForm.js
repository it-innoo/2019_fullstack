import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({ onSubmit, onClick }) => {
  const username = useField('text')
  const password = useField('password')
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
              {...username}
              id="username"
              name="username"
              placeholder="Username"
              required
              autoFocus
            />
          </p>
          <div>
            <label htmlFor="password">Password</label>
            <input
              {...password}
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <button className="btn btn-login btn-primary btn-block" type="submit">login</button>
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
