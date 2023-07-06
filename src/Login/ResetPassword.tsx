// import React, { useState } from "react";
// import { Form, Input, Button, Col, Row } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from "../Firebase/Firebase";


// import "../Css/Logincss.css";

// const ResetPassword: React.FC = () => {


  

//   return (
//     <Row align="middle" className="layout ">
//       <Col className="layoytlog" span={10} style={{ height: '100%', width: '100%' }}>
//         <Form  className="mt-10">
//           <Form.Item>
//             <img src="/img/Logoalta.png" alt="" />
//           </Form.Item>
//           <h5>Đặt lại mật khẩu mới</h5>
//           <label className="labletk">Mật Khẩu</label>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
           
//           >
//             <Input.Password
//               className="input"
             
//               placeholder="Password"
            
//             />
//           </Form.Item>
//           <label className="labletk">Nhập lại mật khẩu</label>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
           
//           >
//             <Input.Password
//               className="input"
           
//               placeholder="Password"
            
//             />
//           </Form.Item>
//           <Button className="btlogin" htmlType="submit">
//             Xác nhận
//           </Button>
//         </Form>
//       </Col>
//       <Col className="bg-home" span={14} style={{ height: '100%', width: '100%' }}>
//         <img src="/img/Frame.png" width={848} alt="Logo" />
//       </Col>
//     </Row>
//   );
// };

// export default ResetPassword;


// import React, { useState } from 'react';
// import { getAuth, updatePassword } from 'firebase/auth';

// const ResetPasswordForm: React.FC = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleResetPassword = () => {
//     if (newPassword === confirmPassword) {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (user) {
//         updatePassword(user, newPassword)
//           .then(() => {
//             console.log('Mật khẩu đã được thay đổi thành công');
//           })
//           .catch((error) => {
//             console.error('Lỗi khi thay đổi mật khẩu:', error);
//             setError('Đã có lỗi xảy ra khi đặt lại mật khẩu');
//           });
//       } else {
//         setError('Người dùng hiện tại không tồn tại');
//       }
//     } else {
//       setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
//     }
//   };
  

//   return (
//     <div>
//       <h2>Đặt lại mật khẩu</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div>
//           <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
//           <input
//             type="password"
//             id="currentPassword"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="newPassword">Mật khẩu mới:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <button onClick={handleResetPassword}>Đặt lại mật khẩu</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordForm;
import React, { useState, useEffect } from 'react';
import {  useLocation, useParams } from 'react-router-dom';
import { getAuth, checkActionCode, confirmPasswordReset } from 'firebase/auth';

const ChangePasswordPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyActionCode = async () => {
      try {
        const auth = getAuth();
        await checkActionCode(auth, oobCode??"");
      } catch (error) {
        setError('Mã hành động không hợp lệ hoặc đã hết hạn.');
      }
    };

    verifyActionCode();
  }, [oobCode]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode??"", newPassword);
    } catch (error) {
      setError('Đã xảy ra lỗi khi đổi mật khẩu.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        <button type="submit">Đổi mật khẩu</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
