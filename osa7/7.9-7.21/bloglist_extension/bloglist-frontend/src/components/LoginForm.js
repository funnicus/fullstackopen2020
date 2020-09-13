import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField,
} from '@material-ui/core'
import './LoginForm.css'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
      <div id='loginForm'>
        <h2>Log in to the Blog App</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label='username'
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={e => handleUsernameChange(e)}
            />
          </div>
          <div>
            <TextField
              label='password'
              type="password"
              id='password'
              value={password}
              name="Password"
              onChange={e => handlePasswordChange(e)}
            />
          </div>
          <Button variant='contained' id='login-button' type="submit">login</Button>
        </form>
      </div>
  )
}

LoginForm.proTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm