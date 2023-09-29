import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');

const initialState = {
  name: '', // Initial name state
  email: '', // Initial email state
  password: '', // Initial password state
  userLoggedIn: false,
};

export const userHandlingSlice = createSlice({
  name: 'userHandling',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload; // Update the name state
    },
    updateEmail: (state, action) => {
      state.email = action.payload; // Update the email state
    },
    updatePassword: (state, action) => {
      state.password = action.payload; // Update the password state
    },
    updateUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload; // Update the userLoggedIn state
    },
  },
});

export const { updateName, updateEmail, updatePassword, updateUserLoggedIn } = userHandlingSlice.actions;
export default userHandlingSlice.reducer;
