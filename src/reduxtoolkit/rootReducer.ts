import { combineReducers } from '@reduxjs/toolkit';
import serviceReducer from './servicesSlice';
import devicesSlice from './DeviceSlice'
import NumberLeverSlice from './NumberLeverSlice';
import RolesSlice from './RolesSlice';
import UserSliec from './UserSliec';
const rootReducer = combineReducers({
  service: serviceReducer,
  device: devicesSlice,
  numberlever: NumberLeverSlice,
  roles: RolesSlice,
  user: UserSliec,
});

export default rootReducer;
