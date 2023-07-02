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
import ChietTietService from './pages/ChitetServiceDemo';
import EditService from './pages/EditService';
import DemoFechDevices from './Component/DemoFechDevices';
import NumberLever from './pages/NumberLever';
import NewnumberLever from './pages/NewnumberLever';
import Report from './pages/Report';
import DemoOption from './Component/DemoOptionSelect';






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
        <Route path="/detailService/:id_sv" element={<ChietTietService/>} />
        <Route path="/editService/:id_sv" element={<EditService />} />
        <Route path="/c" element={<AddDemo />} />
        <Route path="/d" element={<SignUpForm />} />
        <Route path="/g" element={<DemoFechDevices />} />
        <Route path="/reports" element={<Report />} />

        <Route path="/numbers" element={<NumberLever />} />
        <Route path="/x" element={<DemoOption />} />

   
        <Route path="/addNumberLever" element={<NewnumberLever />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteApp