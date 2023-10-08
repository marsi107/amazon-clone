import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmail, updatePassword } from '../redux/userHandlingSlice'

const LoginCredentials = () => {
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
      <div className="leading-loose pb-2 w-full">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          className="border rounded w-full border-slate-500"
          type="email"
          id="email"
          name="email"
          placeholder=""
          required
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          className="border rounded w-full border-slate-500"
          type="password"
          id="password"
          name="password"
          placeholder=""
          required
          value={localPassword}
          onChange={(e) => setLocalPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LoginCredentials;
