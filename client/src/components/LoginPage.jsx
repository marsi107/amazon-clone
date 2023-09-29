import { LoginCredentials } from './';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { updateName, updateEmail, updatePassword, updateUserLoggedIn } from '../redux/userHandlingSlice';

const LoginPage = () => {
    const email = useSelector((state)=> state.userHandling.email);
    const password = useSelector((state)=> state.userHandling.password);
    const dispatch = useDispatch();

    const onHandleLoginClick = () => {
        const params = {
            email: email.payload,
            password: password.payload,
          };
        
        axios.post('/login-process', params).then(response => {            
            const { token, userFound, userLoggedIn } = response.data;

            // Store the token in local storage or a secure cookie
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userFound.id);
            dispatch(updateName({ type: 'UPDATE_NAME', payload: userFound.name }))    
            dispatch(updateEmail({ type: 'UPDATE_EMAIL', payload: userFound.email }))    
            dispatch(updatePassword({ type: 'UPDATE_PASSWORD', payload: userFound.password }))    
            dispatch(updateUserLoggedIn({ type: 'UPDATE_USER_LOGGEDIN', payload: userLoggedIn })) 
            window.location = "/"
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.response.data.message);
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