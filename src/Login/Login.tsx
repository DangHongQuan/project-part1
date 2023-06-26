import React, { useState } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/Firebase";

import "../Css/Logincss.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
   
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(""); // Reset password error when password changes
  };

  const handleSubmit = async (values: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Login failed", error);
      
      setPasswordError("Sai mật khẩu hoặc tên đăng nhập"); // Set password error message
    }
  };

  return (
    <Row align="middle" className="layout">
      <Col className="layoytlog" span={10} style={{ height: '100%', width: '100%' }}>
        <Form onFinish={handleSubmit} className="mt-5">
          <Form.Item>
            <img src="/img/Logoalta.png" alt="" />
          </Form.Item>
          <label className="labletk">Tên đăng nhập*</label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              className="input"
              prefix={<UserOutlined />}
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Item>
          <label className="lablemk">Mật khẩu *</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            validateStatus={passwordError ? "error" : ""}
            help={passwordError}
          >
            <Input.Password
              className="input"
              prefix={<LockOutlined />}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <a className="qmklogin">Quên mật khẩu?</a>
          <Form.Item>
            <Button className="btlogin" htmlType="submit">
              Đặng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className="bg-home" span={14} style={{ height: '100%', width: '100%' }}>
        <img src="/img/bgh.jpg" width={848} alt="Logo" />
      </Col>
    </Row>
  );
};

export default Login;
