import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Tag } from 'antd';
import { addNewroles } from './../reduxtoolkit/RolesActions';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reduxtoolkit/store';
import { AnyAction } from 'redux';

const RolesForm = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();


  const handleAddData = (values) => {
    dispatch(addNewroles(values));
    form.resetFields(); // Reset form after adding data
  };

  const [form] = Form.useForm();

  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleCheckboxChange = (e: any) => {
    const checked = e.target.checked;
    setIsCheckedAll(checked);
  };
  return (
    <div>
      <h2>Roles Form</h2>

      <Form form={form} onFinish={handleAddData}>
        <Form.Item name="name" label="Role Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="describe" label="Role Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="function_a" label="Chuc nang a">
          <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox value="Chức năng a">Chức năng a</Checkbox>
            <Checkbox value="Chức năng b">Chức năng b</Checkbox>
            <Checkbox value="Chức năng c">Chức năng c</Checkbox>
            <Checkbox value="Chức năng d">Chức năng d</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="function_b" label="Chức năng b">
  
 
  <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
    <Checkbox  name='a' value="all">Tất cả</Checkbox>
    <Checkbox name='a' value="Chức năng 1">Chức năng a</Checkbox>
    <Checkbox  name='a' value="Chức năng 2">Chức năng b</Checkbox>
    <Checkbox  name='a'  value="Chức năng 3">Chức năng c</Checkbox>
    <Checkbox  name='a' value="Chức năng 4">Chức năng d</Checkbox>
  </Checkbox.Group>
</Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add New Role
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RolesForm;
