import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData } from '../reduxtoolkit/serviceActions'; // Đường dẫn đúng đến serviceActions
import { RootState } from '../reduxtoolkit/store';
import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchrolesData } from '../reduxtoolkit/RolesActions';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const FechtRoles = () => {
  const navigate = useNavigate();

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { dataroles, isLoading, error } = useSelector((state: RootState) => state.roles);

  useEffect(() => {
    dispatch(fetchrolesData());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị thông báo tải dữ liệu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <div>
      {dataroles.map((item) => (
        <div key={item.name}>
          {/* Hiển thị dữ liệu từ Firestore */}
          <span>{item.name} {item.describe} {item.function_a} {item.function_b}</span>
          <button onClick={() => navigate(`/updateRoles/${item.name}`)}>Cập nhật</button>
              <br />
          {/* ... */} 
        </div>
      ))}
    </div>
  );
};


export default FechtRoles;