import { LoginCredentials } from './';
import { Link } from 'react-router-dom';

const RegisterPage = () => {

    const onHandleRegisterClick = () => {
        const params = {
            name: 'name1',
            email: 'email1',
            password: 'pass1',
          };

        fetch("/register-process", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        }).then(res => {                
            if (res.ok) return res.json()              
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url
        }).catch(e => {
            console.error(e.error)
        })
    }

  return (
    <div>
        <h1>Register</h1>
        <div>
            <label htmlFor="name">Name</label>
            <input className="border" type="name" id="name" name="name" required />
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