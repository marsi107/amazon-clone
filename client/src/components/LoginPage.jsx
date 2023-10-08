import { LoginCredentials } from './';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { updateName, updateEmail, updatePassword, updateUserLoggedIn } from '../redux/userHandlingSlice';

const LoginPage = () => {
    const email = useSelector((state) => state.userHandling.email);
    const password = useSelector((state) => state.userHandling.password);
    const dispatch = useDispatch();

    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://amazon-clone-4fgu.onrender.com';

    const onHandleLogin = (event) => {
        const params = {
            email: email.payload,
            password: password.payload,
        };

        event.preventDefault(); // Prevent the default form submission behavior

        axios.post(SERVER_URL + '/login-process', params).then(response => {
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
        <div className="h-screen bg-amazoneClone-bg pt-0">
            <div className="min-w-[300px] max-w-[500px] m-auto pt-2 bg bg-white text-center leading-loose">
                <h1 className="text-3xl xl:text-3xl m-4 font-semibold">
                    Login
                </h1>
                <form action="" method="post" onSubmit={onHandleLogin}>
                    <LoginCredentials />
                    <Link to={`/register`}>
                        Don't have an account? <span className="text-blue-500">Register</span>
                    </Link>
                    <button
                        className="btn"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage