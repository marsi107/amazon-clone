import { LoginCredentials } from './';
import { Link } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {

    const onHandleLoginClick = () => {
        const params = {
            email: 'email1',
            password: 'pass1',
          };
        
        axios.post('/login-process', params).then(response => {
            console.log(response.data);
            // Handle the server response as needed
        })
        .catch(error => {
            console.error(error);
            // Handle any errors
        });
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