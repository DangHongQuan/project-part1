import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './servicesSlice';

const rootReducer = combineReducers({
  service: serviceReducer,
});

export default rootReducer;
