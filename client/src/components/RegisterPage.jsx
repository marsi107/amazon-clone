import { LoginCredentials } from './';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const onHandleRegisterClick = () => {
        fetch("/register-process", {
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

    const onHandleLoginClick = () => {
        
    }

  return (
    <div>
        <h1>Register</h1>
        <div>
            <label htmlFor="name">Name</label>
            <input type="name" id="name" name="name" required />
        </div>
        <LoginCredentials />
        <Link to={`/login`}>                            
            Already registered? <span className="text-blue-500">Log In</span>
        </Link>
        <button className="btn"
        type="submit"
        onClick={onHandleRegisterClick}
        >
            Register
        </button>
    </div>
  )
}

export default RegisterPage