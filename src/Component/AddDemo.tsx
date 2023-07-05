// import { useDispatch, useSelector } from 'react-redux';
// import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
// import { Form, Input, Button } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { RootState } from '../reduxtoolkit/store';
// import { addNewNumber, fetchNumberData } from '../reduxtoolkit/NumberLeverActions';



// import firebase from 'firebase/compat/app';
// import 'firebase/firestore';

// function AddDemo() {
//   const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
//   const [startDate, setStartDate] = useState(new Date().toISOString());
//   const [endDate, setEndDate] = useState(
//     new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
//   );

//   const { data } = useSelector((state: RootState) => state.numberlever);
//   const [maxId_cs, setMaxId_cs] = useState(0);
//   const [isMaxIdLoaded, setIsMaxIdLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(fetchNumberData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (data.length > 0) {
//       const maxId_cs = data.reduce((maxId, item) => {
//         const currentId = parseInt(item.id_cs, 10);
//         return currentId > maxId ? currentId : maxId;
//       }, 0);
//       setTimeout(() => {
//         console.log(maxId_cs);
//         setMaxId_cs(maxId_cs +1);
//         setIsMaxIdLoaded(true);
//       }, 50); // Hiển thị giá trị sau 5 giây
//     }
//   }, [data]);

//   const handleAddNewNumber = async (values: any) => {
//     values.id_cs = maxId_cs;
//     const actionResult = await dispatch(addNewNumber(values));
//     const newServiceData = unwrapResult(actionResult);

//     alert('Thêm mới thành công:' + newServiceData);
//   };

//   return (
//     <div>

//       <Form  onFinish={handleAddNewNumber}>


//         <Form.Item label="name_kh" name="name_kh">
//           <Input />
//         </Form.Item>
//         <Form.Item label="name_dv" name="name_dv">
//           <Input />
//         </Form.Item>
//         <Form.Item label="Ngày bắt đầu" name="data" hidden initialValue={startDate}>
//           <Input type="datetime-local" disabled />
//         </Form.Item>
//         <Form.Item label="Ngày kết thúc" name="data_hsd" hidden initialValue={endDate}>
//           <Input type="datetime-local" disabled />
//         </Form.Item>
//         <Form.Item label="status" initialValue="Đang chờ" name="status" hidden>
//           <Input readOnly />
//         </Form.Item>
//         <Form.Item label="powersupply" initialValue="Hệ thống" hidden name="powersupply">
//           <Input readOnly />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Add
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default AddDemo;
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { RootState } from '../reduxtoolkit/store';
import { addNewNumber, fetchNumberData } from '../reduxtoolkit/NumberLeverActions';

import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { format } from 'date-fns';

function AddDemo() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()
  );

  const { data } = useSelector((state: RootState) => state.numberlever);
  const [maxId_cs, setMaxId_cs] = useState(0);
  const [isMaxIdLoaded, setIsMaxIdLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchNumberData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const maxId_cs = data.reduce((maxId, item) => {
        const currentId = parseInt(item.id_cs, 10);
        return currentId > maxId ? currentId : maxId;
      }, 0);
      setTimeout(() => {
        console.log(maxId_cs);
        setMaxId_cs(maxId_cs + 1);
        setIsMaxIdLoaded(true);
      }, 50); // Hiển thị giá trị sau 5 giây
    }
  }, [data]);

  const handleAddNewNumber = async (values: any) => {
    values.id_cs = maxId_cs;
    const actionResult = await dispatch(addNewNumber(values));
    const newServiceData = unwrapResult(actionResult);

    setIsModalVisible(true); // Mở popup khi thêm mới thành công
  };

  const handleModalOk = () => {
    setIsModalVisible(false); // Đóng popup
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Đóng popup
  };

  return (
    <div>
      <Form onFinish={handleAddNewNumber}>
        <Form.Item label="name_kh" name="name_kh">
          <Input />
        </Form.Item>
        <Form.Item label="name_dv" name="name_dv">
          <Input />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="data" hidden initialValue={startDate}>
          <Input type="datetime-local" disabled />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="data_hsd" hidden initialValue={endDate}>
          <Input type="datetime-local" disabled />
        </Form.Item>
        <Form.Item label="status" initialValue="Đang chờ" name="status" hidden>
          <Input readOnly />
        </Form.Item>
        <Form.Item label="powersupply" initialValue="Hệ thống" hidden name="powersupply">
          <Input readOnly />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      

      <Modal
        title="Thông tin vừa thêm"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
         <span>{format(new Date(startDate), "HH:mm:ss 'ngày' dd/MM/yyyy")}</span>
         <span>{format(new Date(endDate), "HH:mm:ss 'ngày' dd/MM/yyyy")}</span>
        <p>Max ID: {maxId_cs}</p>
      
      </Modal>
    </div>
  );
}

export default AddDemo;

