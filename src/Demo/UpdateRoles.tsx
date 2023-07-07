import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData, updateServiceData } from '../reduxtoolkit/serviceActions'; // Đường dẫn đúng đến serviceActions
import { RootState } from '../reduxtoolkit/store';
import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchrolesData } from '../reduxtoolkit/RolesActions';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Menu, Row } from 'antd';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import SubMenu from 'antd/es/menu/SubMenu';
import { Header } from 'react-bootstrap/lib/Modal';
import { Content } from 'react-bootstrap/lib/Tab';
import { firestore } from '../Firebase/Firebase';
import { collection, getDocs, query, updateDoc, where } from '@firebase/firestore';

const UpdateRoles: React.FC = () => {



    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
        setUserData(storedUserData);
    }, []);
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
    const { name } = useParams<{ name: string }>();
    const dataService = useSelector((state: RootState) => state.roles.dataroles);
  
    // Kiểm tra xem dữ liệu đã được lấy thành công hay chưa
    const selectedData = dataService.find((item) => item.name === name);
    if (!selectedData) {
      return <div>Loading...</div>; // Hoặc thông báo lỗi nếu cần
    }
  
    const handleSaveChanges = async (values: any) => {
      const updatedData = {
        ...selectedData,
        ...values,
      };
      const serviceQuery = query(collection(firestore, 'roles'), where('name', '==', selectedData.name));
  const serviceDocs = await getDocs(serviceQuery);
  const serviceDocRef = serviceDocs.docs[0].ref;
  
  await updateDoc(serviceDocRef, updatedData);
  
      // Gửi action updateServiceData với dữ liệu cập nhật
      dispatch(updateServiceData(updatedData));
    };
  
    return (
        <>
             <Form  onFinish={handleSaveChanges} initialValues={selectedData}>
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
        </>
    )
};

export default UpdateRoles;
