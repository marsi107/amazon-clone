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

  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'https://amazon-clone-4fgu.onrender.com';

  const checkInitialState = async () =>{

    console.log('request to ' + SERVER_URL + '/get-users')
    // Call the get-users when the app start, so the server has all the users info used to user Auth
    await axios.get(SERVER_URL + '/get-users').then(response => {
      console.log(response)    
      console.log('get users response --> ' + response.data.Server)    

    }).catch(error => {
      console.error('error:', error);
    });

    if(!userLoggedIn && token){
      const params = {
        userId: userId
      };

      await axios.post(SERVER_URL + '/refresh', params).then(response => {
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
          <Route  path="/checkout" element={userLoggedIn ? <Checkout /> : <LoginPage />}/>
          <Route  path="/product/:id" element={<ProductPage />}/>
          <Route  path="/search" element={<SearchResults />}/>
          <Route  path="/login" element={<LoginPage />}/>
          <Route  path="/register" element={<RegisterPage />}/>
          <Route  path="/account" element={userLoggedIn ? <AccountPage /> : <LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App