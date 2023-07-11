import React, { useEffect, useState } from 'react';
import { registerUser } from '../Firebase/Firebase';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reduxtoolkit/store';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchrolesData } from '../reduxtoolkit/RolesActions';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<File | any>(null);

  const handleRegister = () => {
    if (image) {
      registerUser(name, email, password, address, phone, role, status, image);
    }
  }; 
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { dataroles } = useSelector((state: RootState) => state.roles);
  

  useEffect(() => {
      dispatch(fetchrolesData());
  }, [dispatch]);

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <select
        onChange={(e) => setRole(e.target.value)}
        className="slectTop slv ms-4" >
        <option></option>
        {dataroles.map((item) => (

          <option key={item.name} value={item.name}>
            {item.name}
          </option>

        ))}
      </select>
      <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
// import React, { useEffect } from 'react';
// import { Form, Input, Select, Button, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../reduxtoolkit/store';
// import { fetchrolesData } from '../reduxtoolkit/RolesActions';
// import { registerUser } from '../Firebase/Firebase';
// import { ThunkDispatch } from 'redux-thunk';
// import { AnyAction } from '@reduxjs/toolkit';

// const RegisterForm: React.FC = () => {
//   const [form] = Form.useForm();
//   const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
//   const { dataroles } = useSelector((state: RootState) => state.roles);

//   const handleRegister = () => {
//     form.validateFields().then((values) => {
//       const { name, email, password, address, phone, role, status, image } = values;
//       if (image && image.fileList.length > 0) {
//         const file = image.fileList[0].originFileObj;
//         registerUser(name, email, password, address, phone, role, status, file);
//       }
//     });
//   };

//   useEffect(() => {
//     dispatch(fetchrolesData());
//   }, [dispatch]);

//   return (
//     <Form form={form}>
//       <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
//         <Input placeholder="Name" />
//       </Form.Item>

//       <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
//         <Input type="email" placeholder="Email" />
//       </Form.Item>

//       <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
//         <Input.Password placeholder="Password" />
//       </Form.Item>

//       <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
//         <Input placeholder="Address" />
//       </Form.Item>

//       <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
//         <Input placeholder="Phone" />
//       </Form.Item>

//       <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
//         <Select placeholder="Select role">
//           {dataroles.map((item) => (
//             <Select.Option key={item.name} value={item.name}>
//               {item.name}
//             </Select.Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please enter the status' }]}>
//         <Input placeholder="Status" />
//       </Form.Item>

//       <Form.Item
//         name="image"
//         label="Image"
//         rules={[{ required: true, message: 'Please upload an image' }]}
//         valuePropName="fileList"
//         getValueFromEvent={(e) => e.fileList}
//       >
//         <Upload name="image" beforeUpload={() => false}>
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         </Upload>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" onClick={handleRegister}>
//           Register
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default RegisterForm;
