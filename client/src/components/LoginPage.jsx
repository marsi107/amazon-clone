import { LoginCredentials } from './';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    const onHandleLoginClick = () => {
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
        <h1>Login</h1>
        <LoginCredentials />
        <Link to={`/register`}>                            
            Don't have an account? <span className="text-blue-500">Register</span>
        </Link>
        <button 
        className="btn"
        type="submit"
        onClick={onHandleLoginClick}
        >
            Log In
        </button>
    </div>
  )
}

export default LoginPage