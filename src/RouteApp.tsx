import React from 'react'

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './Login/ResetPassword';
import HomeDasboard from './pages/HomeDasboard';
import DeviceApp from './pages/DeviceApp';
import Register from './Login/Register';
import PersoalAccount from './pages/PersonalAccount';
import AddDevice from './pages/AddDevice';
import LoginForm from './Demo/LoginFrom';
import Service from './pages/Service';
import AddService from './pages/addService';
import ServiceComponent from './Component/ServiceComponent';
import YourComponent from './Component/YourComponent';
import AddDemo from './Component/AddDemo';
import SignUpForm from './Demo/AddUser';
import DemoFechDevices from './Component/DemoFechDevices';
import NumberLever from './pages/NumberLever';
import NewnumberLever from './pages/NewnumberLever';
import Report from './pages/Report';
import DemoOption from './Component/DemoOptionSelect';
import DetailDevice from './pages/DetailDevice';
import DetailService from './pages/DetailService';
import EditDevice from './pages/EditDevice';
import DetailServiceeee from './pages/DetailService';
import EditServiceeee from './pages/EditServiceeee';






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
        <Route path="/detailService/:id_sv" element={<DetailServiceeee />} />
        <Route path="/editService/:id_sv" element={<EditServiceeee />} />
        <Route path="/c" element={<AddDemo />} />
        <Route path="/d" element={<SignUpForm />} />
        <Route path="/g" element={<DemoFechDevices />} />
        <Route path="/reports" element={<Report />} />

        <Route path="/numbers" element={<NumberLever />} />
        <Route path="/x" element={<DemoOption />} />
        <Route path="/detailDevice/:id" element={<DetailDevice />} />
        <Route path="/editDevice/:id" element={<EditDevice />} />


        <Route path="/addNumberLever" element={<NewnumberLever />} />
        <Route path="/h" element={<DetailService />} />
        <Route path="/j" element={<AddDemo />} />

      </Routes>
    </BrowserRouter>
  )
}

export default RouteApp