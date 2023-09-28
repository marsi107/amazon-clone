import React from 'react'

const LoginPage = () => {

    const onHandleClick = () => {
        fetch("/login-process", {
            headers: {
              "Content-Type": "application/json",
            }
            }).then(res => {                
              if (res.ok) return res.json()              
              return res.json().then(json => Promise.reject(json))
            }).then(({ User }) => {
              console.log(User)
            }).catch(e => {
              console.error(e.error)
            })
    }

  return (
    <div>
        LoginPage
        <button onClick={onHandleClick}>TestButton</button>
    </div>
  )
}

export default LoginPage