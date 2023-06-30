import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../reduxtoolkit/store';
import { Button, Form, Input } from 'antd';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
 // Thay thế `firestore` bằng đối tượng firestore của bạn
import { updateServiceData } from '../reduxtoolkit/serviceActions';
import { firestore } from '../Firebase/Firebase';

function EditDevice() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { id_sv } = useParams<{ id_sv: string }>();
  const data = useSelector((state: RootState) => state.service.data);

  // Kiểm tra xem dữ liệu đã được lấy thành công hay chưa
  const selectedData = data.find((item) => item.id_sv === id_sv);
  if (!selectedData) {
    return <div>Loading...</div>; // Hoặc thông báo lỗi nếu cần
  }

  const handleSaveChanges = async (values: any) => {
    const updatedData = {
      ...selectedData,
      ...values,
    };
    const serviceQuery = query(collection(firestore, 'service'), where('id_sv', '==', selectedData.id_sv));
const serviceDocs = await getDocs(serviceQuery);
const serviceDocRef = serviceDocs.docs[0].ref;

await updateDoc(serviceDocRef, updatedData);

    // Gửi action updateServiceData với dữ liệu cập nhật
    dispatch(updateServiceData(updatedData));
  };
  // Hiển thị chi tiết dữ liệu
  return (
    <div>
      <Form onFinish={handleSaveChanges} initialValues={selectedData}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
        <Form.Item name="id_sv">
          <Input />
        </Form.Item>
        <Form.Item name="describe">
          <Input />
        </Form.Item>
        <Form.Item name="numberlever">
          <Input />
        </Form.Item>
        <Form.Item name="status">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditDevice;
