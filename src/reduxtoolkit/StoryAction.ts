import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";

import { AppThunk, RootState } from "./store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";
import {
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
} from "./StorySlice";

export const fetchstoryData = (): AppThunk => async (dispatch, getState) => {
  dispatch(fetchDataStart());

  try {
    const firestore = getFirestore();
    const storyCollectionRef = collection(firestore, "story");
    const querySnapshot = await getDocs(storyCollectionRef);

    if (!querySnapshot.empty) {
      const rows: StoryData[] = querySnapshot.docs.map(
        (doc) => doc.data() as StoryData
      );
      dispatch(fetchDataSuccess(rows));
    }
  } catch (error) {
    dispatch(fetchDataFailure("Lỗi khi lấy dữ liệu: " + String(error))); // Chuyển error thành string
  }
};

export const updatestoryData = createAsyncThunk(
  "story/updatestoryData",
  async (updatedData: StoryData, { getState }) => {
    try {
      const data = useSelector((state: RootState) => state.story.datastory);
      const { name } = updatedData;

      // Kiểm tra xem dữ liệu có tồn tại trong store hay không
      const existingData = data.find(
        (item: { name: string }) => item.name === name
      );
      if (!existingData) {
        throw new Error(`Dữ liệu với id_sv ${name} không tồn tại.`);
      }

      // Cập nhật dữ liệu trong Firestore
      const storyDocRef = doc(firestore, "story", name);
      const updatedDataObject = { ...updatedData };
      await updateDoc(storyDocRef, updatedDataObject);

      return updatedData; // Trả về dữ liệu đã được cập nhật
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật dữ liệu: ${error}`);
    }
  }
);

export const addNewstory = createAsyncThunk(
  "story/addNewstory",
  async (newstoryData: any) => {
    const firestore: Firestore = getFirestore();
    const newstoryDocRef = await addDoc(
      collection(firestore, "story"),
      newstoryData
    );
    const newstoryId = newstoryDocRef.id;

    return { id_sv: newstoryId, ...newstoryData };
  }
);
