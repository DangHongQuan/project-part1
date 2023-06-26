import React, { useState } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { initializeApp } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/Firebase";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Login failed", error);
      // Xử lý khi đăng nhập thất bại, ví dụ: hiển thị thông báo lỗi
    }
  };
  
  
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <Form onFinish={handleSubmit}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" >
                    Login
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="text" onClick={() => window.location.href = ("/reg")} block>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
