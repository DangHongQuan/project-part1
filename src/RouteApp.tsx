import React from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Demo from './Component/Demo';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import Profile from './Page/Profile';
import DashboardPage from './Page/Dashboard';
import HomeDasboard from './pages/HomeDasboard';
import DeviceApp from './pages/DeviceApp';
import Register from './Login/Register';
import PersoalAccount from './pages/PersonalAccount';
import Myfrom from './Demo/Myfrom';
import AddDevice from './pages/AddDevice';
import LoginForm from './Demo/LoginFrom';
import Service from './pages/Service';





function RouteApp() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Myfrom />} />
        <Route path='/forgorpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/dasboard' element={<HomeDasboard />} />
        <Route path='/device' element={<DeviceApp />} />
        <Route path='/persoalaccount' element={<PersoalAccount />} />
        <Route path='/res' element={<Register />} />
        <Route path='/addDevice' element={<AddDevice />} />
        <Route path='/l' element={<LoginForm />} />
        <Route path='/services' element={<Service />} />

      </Routes>
    </BrowserRouter>
  )
}

export default RouteApp