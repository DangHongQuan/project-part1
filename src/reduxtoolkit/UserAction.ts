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
import { UserData, fetchDataFailure, fetchDataStart, fetchDataSuccess } from "./UserSliec";

  export const fetchUsersData = (): AppThunk => async (dispatch, getState) => {
    dispatch(fetchDataStart());
  
    try {
      const firestore = getFirestore();
      const UsersCollectionRef = collection(firestore, "users");
      const querySnapshot = await getDocs(UsersCollectionRef);
  
      if (!querySnapshot.empty) {
        const rows: UserData[] = querySnapshot.docs.map(
          (doc) => doc.data() as UserData
        );
        dispatch(fetchDataSuccess(rows));
      }
    } catch (error) {
      dispatch(fetchDataFailure("Lỗi khi lấy dữ liệu: " + String(error))); // Chuyển error thành string
    }
  };
  
  export const updateUsersData = createAsyncThunk(
    "Users/updateUsersData",
    async (updatedData: UserData, { getState }) => {
      try {
        const data = useSelector((state: RootState) => state.user.data);
        const { email } = updatedData;
  
        // Kiểm tra xem dữ liệu có tồn tại trong store hay không
        const existingData = data.find(
          (item: { email: string }) => item.email === email
        );
        if (!existingData) {
          throw new Error(`Dữ liệu với id_sv ${email} không tồn tại.`);
        }
  
        // Cập nhật dữ liệu trong Firestore
        const UsersDocRef = doc(firestore, "users", email);
        const updatedDataObject = { ...updatedData };
        await updateDoc(UsersDocRef, updatedDataObject);
  
        return updatedData; // Trả về dữ liệu đã được cập nhật
      } catch (error) {
        throw new Error(`Lỗi khi cập nhật dữ liệu: ${error}`);
      }
    }
  );
  
  export const addNewUsers = createAsyncThunk(
    "Users/addNewUsers",
    async (newUsersData: any) => {
      const firestore: Firestore = getFirestore();
      const newUsersDocRef = await addDoc(
        collection(firestore, "users"),
        newUsersData
      );
      const newUsersId = newUsersDocRef.id;
  
      return { id_cs: newUsersId, ...newUsersData };
    }
  );
  