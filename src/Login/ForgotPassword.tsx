import React, { useState } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/Firebase";

import "../Css/Logincss.css";

const ForgotPassword: React.FC = () => {


  

  return (
    <Row align="middle" className="layout ">
      <Col className="layoytlog" span={10} style={{ height: '100%', width: '100%' }}>
        <Form  className="mt-10">
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
              placeholder="Email"
             
            />
         <br />
            <Button className="btlogin mt-5" htmlType="submit" >
              Quên mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col className="bg-home" span={14} style={{ height: '100%', width: '100%' }}>
        <img src="/img/Frame.png" width={848} alt="Logo" />
      </Col>
    </Row>
  );
};

export default ForgotPassword;
