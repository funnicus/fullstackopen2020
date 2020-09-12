import React from 'react'

const User = ({ user }) => {
    
  if (!user) return null
  const blogs = user.blogs.map(b => <li key={b.id} >{b.title}</li>)
    
  return (
    <div>
      <h2>{user.name}</h2>
      <div>
          <ul>
            {blogs}
          </ul>
      </div>
    </div>
  )
}

export default User