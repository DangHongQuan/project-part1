import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './servicesSlice';
import devicesSlice from './DeviceSlice'
const rootReducer = combineReducers({
  service: serviceReducer,
  device: devicesSlice,
});

export default rootReducer;
