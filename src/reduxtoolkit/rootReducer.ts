import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './servicesSlice';
import devicesSlice from './DeviceSlice'
import NumberLeverSlice from './NumberLeverSlice';
const rootReducer = combineReducers({
  service: serviceReducer,
  device: devicesSlice,
  numberlever: NumberLeverSlice
});

export default rootReducer;
