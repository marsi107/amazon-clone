import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { HomePage, NavBar, Checkout, ProductPage, SearchResults, LoginPage, RegisterPage, AccountPage } from './components'
import { updateName, updateEmail, updatePassword, updateUserLoggedIn } from './redux/userHandlingSlice';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userLoggedIn = useSelector((state)=> state.userHandling.userLoggedIn);
  const dispatch = useDispatch();

  const checkInitialState = async () =>{
    if(!userLoggedIn && token){
      const params = {
        userId: userId
      };

      await axios.post('/refresh', params).then(response => {
        const { userFound } = response.data;

        dispatch(updateName({ type: 'UPDATE_NAME', payload: userFound.name }))    
        dispatch(updateEmail({ type: 'UPDATE_EMAIL', payload: userFound.name }))    
        dispatch(updatePassword({ type: 'UPDATE_PASSWORD', payload: userFound.name }))    
        dispatch(updateUserLoggedIn({ type: 'UPDATE_USER_LOGGEDIN', payload: true }))    

      }).catch(error => {
          console.error('error:', error);
      });
    }
  }

  useEffect(() => {
    checkInitialState();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<HomePage />}/>
          <Route  path="/checkout" element={<Checkout />}/>
          <Route  path="/product/:id" element={<ProductPage />}/>
          <Route  path="/search" element={<SearchResults />}/>
          <Route  path="/login" element={<LoginPage />}/>
          <Route  path="/register" element={<RegisterPage />}/>
          <Route  path="/account" element={<AccountPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App