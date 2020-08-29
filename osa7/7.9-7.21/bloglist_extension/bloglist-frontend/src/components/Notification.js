import React from 'react'
import '../styles/Notification.css'
const Notification = ({ message, messageClassName }) => (
  <div className={messageClassName}>
    {message}
  </div>
)

export default Notification