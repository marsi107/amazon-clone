import React from 'react'

const LoginCredentials = () => {
  return (
    <div>
        <div>
            <label htmlFor="email">Email</label>
            <input className="border" type="email" id="email" name="email" required />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input className="border" type="password" id="password" name="password" required />
        </div>
    </div>
  )
}

export default LoginCredentials