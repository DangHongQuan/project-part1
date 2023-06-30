import { addNewService } from '../reduxtoolkit/serviceActions';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button } from 'antd';
import React from 'react';
import { RootState } from '../reduxtoolkit/store';

function AddDemo() {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();


  const handleAddNewService = async (values: any) => {
    // Thực hiện các xử lý bạn cần với dữ liệu mới

      // Gọi action addNewService để thêm tài liệu mới và cập nhật Redux Toolkit
      const actionResult = await dispatch(addNewService(values));
      const newServiceData = unwrapResult(actionResult);

      // Xử lý thành công sau khi thêm và cập nhật Redux Toolkit
      alert('Thêm mới thành công:' + newServiceData);
   
  };

  return (
    <div>
      <Form onFinish={handleAddNewService}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Input />
        </Form.Item>
        <Form.Item name="describe" label="Describe">
          <Input />
        </Form.Item>
        <Form.Item name="id_sv" label="ID">
          <Input />
        </Form.Item>
        <Form.Item name="numberlever" label="Number Lever">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddDemo;
