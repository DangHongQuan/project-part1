import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import React from 'react';
import { RootState } from '../reduxtoolkit/store';
import { addNewDevices } from '../reduxtoolkit/DevicesActions';
function DemoFechDevices() {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const handleAddNewService = async (values: any) => {
    // Perform any processing you need with the new data

    // Call addNewService action to add new service and update Redux Toolkit
    const actionResult = await dispatch(addNewDevices(values));
    const newServiceData = unwrapResult(actionResult);

    // Handle success after adding and updating Redux Toolkit
    alert('Thêm mới thành công:' + newServiceData);
  };

  return (
    <div>
      <Form onFinish={handleAddNewService}>
        <Form.Item name="id_dc" label="Ma thiet bi">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="loai thiet bi">
          <Select>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
        <Form.Item name="username" label="tk">
          <Input />
        </Form.Item>
        <Form.Item name="ip" label="ip">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="mk">
          <Input />
        </Form.Item>
        <Form.Item name="servie_dc" label="dich vu su dung">
          <Input />
        </Form.Item>
        <Form.Item name="status_hd" label="hd">
          <Input />
        </Form.Item>
        <Form.Item name="status_kn" label="kn">
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

export default DemoFechDevices;
