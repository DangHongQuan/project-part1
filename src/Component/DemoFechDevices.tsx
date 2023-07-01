import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch, unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button, Checkbox } from 'antd';
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
        <Form.Item name="id_dc" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Status">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Describe">
          <Input />
        </Form.Item>
        <Form.Item name="username" label="ID">
          <Input />
        </Form.Item>
        <Form.Item name="ip" label="ID">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="ID">
          <Input />
        </Form.Item>
        <Form.Item name="servie_dc" label="ID">
          <Input />
        </Form.Item>
        {/* <Form.Item name="numberlever" label="Number Lever">
          <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox value="Option 1">Option 1</Checkbox>
            <Checkbox value="Option 2">Option 2</Checkbox>
            <Checkbox value="Option 3">Option 3</Checkbox>
          </Checkbox.Group>
        </Form.Item> */}
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
