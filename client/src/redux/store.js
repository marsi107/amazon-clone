import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'
import userHandlingSlice from './userHandlingSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        userHandling: userHandlingSlice
    }
});