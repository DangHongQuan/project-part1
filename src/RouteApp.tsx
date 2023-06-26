import React from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Demo from './Component/Demo';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import Profile from './Page/Profile';




function RouteApp() {
  return (
    <BrowserRouter >
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Demo/>} />
        <Route path='/forgorpassword' element={<ForgotPassword/>} />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        <Route path='/profile' element={<Profile/>} />
    

    </Routes>
  </BrowserRouter>
  )
}

export default RouteApp