import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

  const userlist = users.map(user => {
    return (
        <tr key={user.id} >
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
        </tr>
    )
  })

  return (
    <div>
      <h2>Users</h2>
      <div>
          <table>
            <thead>
            <tr>
                <th>Username</th>
                <th>Blogs</th>
            </tr>
            </thead>
            <tbody>
            {userlist}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default UserList