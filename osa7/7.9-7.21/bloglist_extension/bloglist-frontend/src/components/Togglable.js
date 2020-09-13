/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-unused-vars
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable