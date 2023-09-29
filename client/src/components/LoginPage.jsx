import { LoginCredentials } from './';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { updateName, updateUserLoggedIn } from '../redux/userHandlingSlice';

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
            console.log(response.data);
            
            const { token, userFound, userLoggedIn } = response.data;

            // Store the token in local storage or a secure cookie
            localStorage.setItem('token', token);
            dispatch(updateName({ type: 'UPDATE_NAME', payload: userFound.name }));
            dispatch(updateUserLoggedIn({ type: 'UPDATE_USER_LOGGEDIN', payload: userLoggedIn }));
            //window.location = "/"
            console.log(userFound.name)
            console.log('userLoggedIn ' +  userLoggedIn)
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