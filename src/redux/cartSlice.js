import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    productsNumber: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Check if the product already exists in the cart
            // addProductExists will be the first matching objecto of the state.products array or undefined
            const addProductExists = state.products.find((product) => 
                product.id === action.payload.id
            );
            if (addProductExists) {
                // If it exists, update the quantity
                addProductExists.quantity += parseInt(action.payload.quantity);
            } else {
                // If it doesn't exist, add the product to the cart
                state.products.push({ ...action.payload, quantity: parseInt(action.payload.quantity) });
            }
            // Update the total product count in the cart
            state.productsNumber = state.productsNumber + parseInt(action.payload.quantity);
        },        
        removeFromCart: (state, action) => {

        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;