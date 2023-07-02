
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
import { DataDevice, fetchDataDeviceFailure, fetchDataDeviceSuccess, fetchDateDeviceStart } from "./DeviceSlice";
import DeviceeData from "./DevicesData";
import { useEffect, useState } from "react";
  
  export const fetchDevicesData = (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchDateDeviceStart());
  
    try {
      const firestore = getFirestore();
      const serviceCollectionRef = collection(firestore, "devices");
      const querySnapshot = await getDocs(serviceCollectionRef);
  
      if (!querySnapshot.empty) {
        const rows: DataDevice[] = querySnapshot.docs.map((doc) => doc.data() as DataDevice);
        dispatch(fetchDataDeviceSuccess(rows));
      }
    } catch (error) {
      dispatch(fetchDataDeviceFailure("Lỗi khi lấy dữ liệu: " + String(error))); // Chuyển error thành string
    }
  };
  
  export const updateDevicesData = createAsyncThunk(
    "devices/updateDevicesData",
    async (updatedData: DeviceeData, { getState }) => {
      try {
        
        const data = useSelector((state: RootState) => state.device.data);
        const { id_dc } = updatedData;
  
        // Kiểm tra xem dữ liệu có tồn tại trong store hay không
        const existingData = data.find(
          (item: { id_dc: string }) => item.id_dc === id_dc
        );
        if (!existingData) {
          throw new Error(`Dữ liệu với id_sv ${id_dc} không tồn tại.`);
        }
  
        // Cập nhật dữ liệu trong Firestore
        const serviceDocRef = doc(firestore, "devices", id_dc);
        const updatedDataObject = { ...updatedData };
        await updateDoc(serviceDocRef, updatedDataObject);
  
        return updatedData; // Trả về dữ liệu đã được cập nhật
      } catch (error) {
        throw new Error(`Lỗi khi cập nhật dữ liệu: ${error}`);
      }
    }
  );
  
  // const [ipAddress, setIPAddress] = useState('');

  //   useEffect(() => {
  //       const fetchIPAddress = async () => {

  //           const response = await fetch('https://api.ipify.org?format=json');
  //           const data = await response.json();
  //           setIPAddress(data.ip);

  //       };

  //       fetchIPAddress();
  //   }, []);
  // export const addNewDevices = createAsyncThunk(
  //   'service/addNewDevices',
  //   async (newServiceData: any) => {
  //     const firestore: Firestore = getFirestore();
  //     const newServiceDocRef = await addDoc(collection(firestore, 'devices'), newServiceData);
  //     ip: ipAddress
  //     const newServiceId = newServiceDocRef.id;
      
  //     return { id_dc: newServiceId, ...newServiceData };
  //   }
  // );

  const fetchIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
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
  
  