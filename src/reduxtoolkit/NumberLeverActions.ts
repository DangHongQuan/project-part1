
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
  import { fetchDataFailure, fetchDataStart, fetchDataSuccess } from "./NumberLeverSlice";
  import Numberlever from "./NumberLaverData";
    
    export const fetchNumberData = (): AppThunk => async (dispatch, getState) => {
      dispatch(fetchDataStart());
    
      try {
        const firestore = getFirestore();
        const numberCollectionRef = collection(firestore, "number");
        const querySnapshot = await getDocs(numberCollectionRef);
    
        if (!querySnapshot.empty) {
          const rows: Numberlever[] = querySnapshot.docs.map((doc) => doc.data() as Numberlever);
          dispatch(fetchDataSuccess(rows));
        }
      } catch (error) {
        dispatch(fetchDataFailure("Lỗi khi lấy dữ liệu: " + String(error))); // Chuyển error thành string
      }
    };
    
    export const updateNumberData = createAsyncThunk(
      "Number/updateNumberData",
      async (updatedData: Numberlever, { getState }) => {
        try {
          
          const data = useSelector((state: RootState) => state.numberlever.data);
          const { id_cs } = updatedData;
    
          // Kiểm tra xem dữ liệu có tồn tại trong store hay không
          const existingData = data.find(
            (item: { id_cs: string }) => item.id_cs === id_cs
          );
          if (!existingData) {
            throw new Error(`Dữ liệu với id_sv ${id_cs} không tồn tại.`);
          }
    
          // Cập nhật dữ liệu trong Firestore
          const numberDocRef = doc(firestore, "number", id_cs);
          const updatedDataObject = { ...updatedData };
          await updateDoc(numberDocRef, updatedDataObject);
    
          return updatedData; // Trả về dữ liệu đã được cập nhật
        } catch (error) {
          throw new Error(`Lỗi khi cập nhật dữ liệu: ${error}`);
        }
      }
    );
    
    export const addNewNumber = createAsyncThunk(
      'Number/addNewNumber',
      async (newNumberData: any) => {
        const firestore: Firestore = getFirestore();
        const newnumberDocRef = await addDoc(collection(firestore, 'number'), newNumberData);
        const newNumberId = newnumberDocRef.id;
        
        return { id_cs: newNumberId, ...newNumberData };
      }
    );
    