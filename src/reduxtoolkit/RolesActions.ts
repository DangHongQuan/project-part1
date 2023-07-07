import { Firestore, addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "@firebase/firestore";
import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "./RolesSlice";
import { AppThunk, RootState } from "./store";
import RolesData from "./RolesData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";

  export const fetchrolesData = (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchDataStart());
  
    try {
      const firestore = getFirestore();
      const rolesCollectionRef = collection(firestore, "roles");
      const querySnapshot = await getDocs(rolesCollectionRef);
  
      if (!querySnapshot.empty) {
        const rows: RolesData[] = querySnapshot.docs.map((doc) => doc.data() as RolesData);
        dispatch(fetchDataSuccess(rows));
      }
    } catch (error) {
      dispatch(fetchDataFailure("Lỗi khi lấy dữ liệu: " + String(error))); // Chuyển error thành string
    }
  };
  
  export const updaterolesData = createAsyncThunk(
    "roles/updaterolesData",
    async (updatedData: RolesData, { getState }) => {
      try {
        
        const data = useSelector((state: RootState) => state.roles.dataroles);
        const { name } = updatedData;
  
        // Kiểm tra xem dữ liệu có tồn tại trong store hay không
        const existingData = data.find(
          (item: { name: string }) => item.name === name
        );
        if (!existingData) {
          throw new Error(`Dữ liệu với id_sv ${name} không tồn tại.`);
        }
  
        // Cập nhật dữ liệu trong Firestore
        const rolesDocRef = doc(firestore, "roles", name);
        const updatedDataObject = { ...updatedData };
        await updateDoc(rolesDocRef, updatedDataObject);
  
        return updatedData; // Trả về dữ liệu đã được cập nhật
      } catch (error) {
        throw new Error(`Lỗi khi cập nhật dữ liệu: ${error}`);
      }
    }
  );
  
  export const addNewroles = createAsyncThunk(
    'roles/addNewroles',
    async (newrolesData: any) => {
      const firestore: Firestore = getFirestore();
      const newrolesDocRef = await addDoc(collection(firestore, 'roles'), newrolesData);
      const newrolesId = newrolesDocRef.id;
      
      return { id_sv: newrolesId, ...newrolesData };
    }
  );
  