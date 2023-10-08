import { useSelector, useDispatch } from 'react-redux';
import { updateName, updateEmail, updatePassword, updateUserLoggedIn } from '../redux/userHandlingSlice';

const AccountPage = () => {

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const dispatch = useDispatch();

  const onHandleLogoutClick = () => {
    localStorage.removeItem('token', token);
    localStorage.removeItem('userId', userId);
    dispatch(updateName({ type: 'UPDATE_NAME', payload: '' }))
    dispatch(updateEmail({ type: 'UPDATE_EMAIL', payload: '' }))
    dispatch(updatePassword({ type: 'UPDATE_PASSWORD', payload: '' }))
    dispatch(updateUserLoggedIn({ type: 'UPDATE_USER_LOGGEDIN', payload: false }))
    window.location = "/"
  }

  return (
    <div className="h-screen bg-amazoneClone-bg pt-0">
      <div className="min-w-[300px] max-w-[500px] m-auto pt-2 bg bg-white text-center leading-loose">
        <h1 className="text-3xl xl:text-3xl m-4 font-semibold">
          AccountPage
        </h1>
        <button
          className="btn"
          type="submit"
          onClick={onHandleLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountPage