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
import AddDevice from './pages/AddDevice';
import LoginForm from './Demo/LoginFrom';
import Service from './pages/Service';
import addService from './pages/addService';
import AddService from './pages/addService';
import ServiceComponent from './Component/ServiceComponent';
import DangDemo from './Component/Demo';
import Themthietbi from './Component/ServiceComponent';
import YourComponent from './Component/YourComponent';
import Demoaaa from './Component/Demo';
import EditDevice from './Component/EditDevice';
import AddDemo from './Component/AddDemo';
import SignUpForm from './Demo/AddUser';






function RouteApp() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgorpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/dasboard' element={<HomeDasboard />} />
        <Route path='/device' element={<DeviceApp />} />
        <Route path='/persoalaccount' element={<PersoalAccount />} />
        <Route path='/res' element={<Register />} />
        <Route path='/addDevice' element={<AddDevice />} />
        <Route path='/l' element={<LoginForm />} />
        <Route path='/services' element={<Service />} />
        <Route path='/addService' element={<AddService />} />
        <Route path='/b' element={<ServiceComponent />} />
        <Route path='/e' element={<YourComponent />} />
        <Route path="/detailDevice/:id_sv" element={<Demoaaa/>} />
        <Route path="/editDevice/:id_sv" element={<EditDevice />} />
        <Route path="/c" element={<AddDemo />} />
        <Route path="/d" element={<SignUpForm />} />


        
      </Routes>
    </BrowserRouter>
  )
}

export default RouteApp