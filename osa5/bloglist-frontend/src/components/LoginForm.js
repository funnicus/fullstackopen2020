import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => (
  <div>
    <h2>Log in to Application</h2>
    <form onSubmit={handleLogin}>
      <div>
          username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={e => handleUsernameChange(e)}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={e => handlePasswordChange(e)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.proTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm