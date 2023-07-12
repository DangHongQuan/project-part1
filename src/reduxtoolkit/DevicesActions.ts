
  import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    Firestore,
    addDoc,
  } from "firebase/firestore";
  import { AppThunk, RootState } from "./store";
  import { createAsyncThunk } from "@reduxjs/toolkit";
  import { useSelector } from "react-redux";
  import { firestore } from "../Firebase/Firebase";
import { DataDevice,  fetchDataDeviceSuccess, fetchDateDeviceStart } from "./DeviceSlice";
import DeviceeData from "./DevicesData";
  
 
    export const fetchDevicesData = (): AppThunk => async (dispatch, getState) => {
      dispatch(fetchDateDeviceStart());
        const firestore = getFirestore();
        const serviceCollectionRef = collection(firestore, "devices");
        const querySnapshot = await getDocs(serviceCollectionRef);
    
        if (!querySnapshot.empty) {
          const rows: DataDevice[] = querySnapshot.docs.map((doc) => {
            const data = doc.data() as DataDevice;
            const id = doc.id;
            return { ...data, id }; // Tạo object mới và gán giá trị cho thuộc tính id
          });
          dispatch(fetchDataDeviceSuccess(rows));
        }
 
    };
    
  
  export const updateDevicesData = createAsyncThunk(
    "devices/updateDevicesData",
    async (updatedData: DeviceeData, { getState }) => {
    
        
        const data = useSelector((state: RootState) => state.device.dataDevice);
        const { id_dc } = updatedData;
  
        // Kiểm tra xem dữ liệu có tồn tại trong store hay không
        const existingData = data.find(
          (item: { id_dc: string }) => item.id_dc === id_dc
        );
        const serviceDocRef = doc(firestore, "devices", id_dc);
        const updatedDataObject = { ...updatedData };
        await updateDoc(serviceDocRef, updatedDataObject);
  
        return updatedData; // Trả về dữ liệu đã được cập nhật
  
    }
  );
  

  const fetchIPAddress = async () => {
  
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;

  };
  
  export const addNewDevices = createAsyncThunk(
    'service/addNewDevices',
    async (newDeviceData: any) => {
      const ipAddress = await fetchIPAddress();
      if (ipAddress) {
        const firestore: Firestore = getFirestore();
        const newServiceDocRef = await addDoc(collection(firestore, 'devices'), { ...newDeviceData, ip: ipAddress });
        const newServiceId = newServiceDocRef.id;
        return { id_dc: newServiceId, ...newDeviceData };
      } else {
        throw new Error('Failed to fetch IP address');
      }
    }
  );
  
  