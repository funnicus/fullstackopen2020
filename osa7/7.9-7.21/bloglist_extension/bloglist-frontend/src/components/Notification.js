import React from 'react'
import '../styles/Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const style = useSelector(state => state.notification.style)
  return (
    <div className={style} style={notification ? { display: 'block' } : { display: 'none' }}>
      {notification}
    </div>
  )
}

export default Notification