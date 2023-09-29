import { useSelector, useDispatch } from 'react-redux';
import { updateName, updateEmail, updatePassword, updateUserLoggedIn } from '../redux/userHandlingSlice';

const AccountPage = () => {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const onHandleLogoutClick = ()=>{
        localStorage.removeItem('token', token);
        localStorage.removeItem('userId', userId);
        dispatch(updateName({ type: 'UPDATE_NAME', payload: '' }))    
        dispatch(updateEmail({ type: 'UPDATE_EMAIL', payload: '' }))    
        dispatch(updatePassword({ type: 'UPDATE_PASSWORD', payload: '' }))    
        dispatch(updateUserLoggedIn({ type: 'UPDATE_USER_LOGGEDIN', payload: false })) 
        window.location = "/"
    }

  return (
    <div>AccountPage
        <button
        className="btn"
        type="submit"
        onClick={onHandleLogoutClick}
        >
            Logout
        </button>
    </div>
  )
}

export default AccountPage