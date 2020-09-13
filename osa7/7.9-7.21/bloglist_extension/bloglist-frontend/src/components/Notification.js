import React from 'react'
import '../styles/Notification.css'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const style = useSelector(state => state.notification.style)
  return (
    <Alert severity={style === 'message' ? 'success' : 'error'} style={notification ? { display: 'block' } : { display: 'none' }}>
      {notification}
    </Alert>
  )
}

export default Notification