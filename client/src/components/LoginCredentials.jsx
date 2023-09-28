import React from 'react'

const LoginCredentials = () => {
  return (
    <div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
        </div>
    </div>
  )
}

export default LoginCredentials