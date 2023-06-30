import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData } from '../reduxtoolkit/serviceActions'; // Đường dẫn đúng đến serviceActions
import { RootState } from '../reduxtoolkit/store';
import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const YourComponent = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data, isLoading, error } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(fetchServiceData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị thông báo tải dữ liệu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id_sv}>
          {/* Hiển thị dữ liệu từ Firestore */}
          <span>{item.id_sv}</span>
          <span>{item.name}</span>
          <span>{item.status}</span>
          <span>{item.numberlever}</span>
          <span>{item.status}</span>
          <span>{item.describe}</span>
          {/* ... */}
        </div>
      ))}
    </div>
  );
};


export default YourComponent;