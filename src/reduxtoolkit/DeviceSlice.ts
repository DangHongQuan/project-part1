// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface DataDevice {
//     id_dc: string;
//     type: string;
//     name: string;
//     username: string;
//     password: string;
//     servie_dc: string;
//     status_hd: string;
//     status_kn: string;
//     ip:String;
    
//     // Add the new properties here...
//   }
  


// interface DeviceState {
//   data: DataDevice[]; // Thay thế Data bằng kiểu dữ liệu của dữ liệu lấy từ Firestore
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: DeviceState = {
//   data: [],
//   isLoading: false,
//   error: null,
// };

// const devicesSlice = createSlice({
//   name: 'devices',
//   initialState,
//   reducers: {
//     fetchDateDeviceStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
   
//     fetchDataDeviceSuccess(state, action: PayloadAction<DataDevice[]>) {
//       state.isLoading = false;
//       state.data = action.payload;
//     },
//     fetchDataDeviceFailure(state, action: PayloadAction<string>) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchDateDeviceStart, fetchDataDeviceSuccess, fetchDataDeviceFailure,} = devicesSlice.actions;

// export default devicesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataDevice {
  id: string; // Thêm thuộc tính id vào interface DataDevice
  id_dc: string;
  type: string;
  name: string;
  username: string;
  password: string;
  servie_dc: string;
  status_hd: string;
  status_kn: string;
  ip: string;
}

interface DeviceState {
  data: DataDevice[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  data: [],
  isLoading: false,
  error: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    fetchDateDeviceStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataDeviceSuccess(state, action: PayloadAction<DataDevice[]>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataDeviceFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDateDeviceStart, fetchDataDeviceSuccess, fetchDataDeviceFailure } = devicesSlice.actions;

export default devicesSlice.reducer;
