import { LoginCredentials } from './';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

const LoginPage = () => {

    const email = useSelector((state)=> state.userHandling.email);
    const password = useSelector((state)=> state.userHandling.password);

    const onHandleLoginClick = () => {
        const params = {
            email: email.payload,
            password: password.payload,
          };
        
        axios.post('/login-process', params).then(response => {
            console.log(response.data);
            
            const { token } = response.data;

            // Store the token in local storage or a secure cookie
            localStorage.setItem('token', token);
            console.log("Login successful for user" + params.email)
        })
        .catch(error => {
            console.error('Login failed:', error);
            // TODO Handle login failure, show an error message, etc.
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