import React, { useState } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/Firebase";

import "../Css/Logincss.css";

const ResetPassword: React.FC = () => {


  

  return (
    <Row align="middle" className="layout ">
      <Col className="layoytlog" span={10} style={{ height: '100%', width: '100%' }}>
        <Form  className="mt-10">
          <Form.Item>
            <img src="/img/Logoalta.png" alt="" />
          </Form.Item>
          <h5>Đặt lại mật khẩu mới</h5>
          <label className="labletk">Mật Khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
           
          >
            <Input.Password
              className="input"
             
              placeholder="Password"
            
            />
          </Form.Item>
          <label className="labletk">Nhập lại mật khẩu</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
           
          >
            <Input.Password
              className="input"
           
              placeholder="Password"
            
            />
          </Form.Item>
          <Button className="btlogin" htmlType="submit">
            Xác nhận
          </Button>
        </Form>
      </Col>
      <Col className="bg-home" span={14} style={{ height: '100%', width: '100%' }}>
        <img src="/img/Frame.png" width={848} alt="Logo" />
      </Col>
    </Row>
  );
};

export default ResetPassword;
