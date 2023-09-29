import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from '../redux/userHandlingSlice'

const LoginCredentials = () => {
  // Redux selectors
  const email = useSelector((state) => state.userHandling.email);
  const password = useSelector((state) => state.userHandling.password);
  const dispatch = useDispatch();

  // Local state for managing input fields
  const [localEmail, setLocalEmail] = useState('');
  const [localPassword, setLocalPassword] = useState('');

  // useEffect to update Redux state when local state changes
  useEffect(() => {
    dispatch(updateEmail({ type: 'UPDATE_EMAIL', payload: localEmail }));
  }, [localEmail, dispatch]);

  useEffect(() => {
    dispatch(updatePassword({ type: 'UPDATE_PASSWORD', payload: localPassword }));
  }, [localPassword, dispatch]);

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border"
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          required
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="border"
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          required
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LoginCredentials;
