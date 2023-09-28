import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '', // Initial email state
  password: '', // Initial password state
};

export const userHandlingSlice = createSlice({
  name: 'userHandling',
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload; // Update the email state
    },
    updatePassword: (state, action) => {
      state.password = action.payload; // Update the password state
    },
  },
});

export const { updateEmail, updatePassword } = userHandlingSlice.actions;
export default userHandlingSlice.reducer;
