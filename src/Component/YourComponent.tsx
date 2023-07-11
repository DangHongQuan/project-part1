// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchServiceData } from '../reduxtoolkit/serviceActions'; // Đường dẫn đúng đến serviceActions
// import { RootState } from '../reduxtoolkit/store';
// import React from 'react';
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from 'redux';

// const YourComponent = () => {
//   const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
//   const { dataService, isLoading, error } = useSelector((state: RootState) => state.service);

//   useEffect(() => {
//     dispatch(fetchServiceData());
//   }, [dispatch]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Hiển thị thông báo tải dữ liệu
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Hiển thị thông báo lỗi
//   }

//   return (
//     <div>
//       {dataService.map((item) => (
//         <div key={item.id_sv}>
//           {/* Hiển thị dữ liệu từ Firestore */}
//           <span>{item.id_sv}</span>
//           <span>{item.name}</span>
//           <span>{item.status}</span>
//           <span>{item.numberlever}</span>
//           <span>{item.status}</span>
//           <span>{item.describe}</span>
//           {/* ... */}
//         </div>
//       ))}
//     </div>
//   );
// };


// export default YourComponent;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData } from '../reduxtoolkit/serviceActions'; // Đường dẫn đúng đến serviceActions
import { RootState } from '../reduxtoolkit/store';
import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchUsersData } from './../reduxtoolkit/UserAction';

const YourComponent = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);
  // const countManagers = data.filter(item => item.role === 'Quản lý').length;
  const countByRole = data.reduce((count, item) => {
    count[item.role] = (count[item.role] || 0) + 1;
    return count;
  }, {});

  return (
    <div>
      {Object.entries(countByRole).map(([role, count]) => (
        <div key={role}>Số lượng {role}: </div>
      ))}
      {data.map((item) => (
        <div key={item.email}>
          <span>{item.email}</span>
          <span>{item.role}</span>
        </div>
      ))}
    </div>
    
  );
};


export default YourComponent;