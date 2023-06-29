import React, { useState } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Firebase/Firebase";

import "../Css/Logincss.css";

const ForgotPassword: React.FC = () => {


  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      // Gửi yêu cầu lấy lại mật khẩu
      await sendPasswordResetEmail(auth, values.email);
      console.log("Password reset email sent successfully");
      setErrorMessage("Vui lòng kiểm tra hộp thư đến.");
      setInputError(false);
    } catch (error) {
      console.log("Password reset failed", error);
      setErrorMessage(
        "Yêu cầu lấy lại mật khẩu không thành công. Vui lòng kiểm tra lại địa chỉ email."
      );
      setInputError(true);
    }
  };


  return (
    <Row align="middle" className="layout ">
      <Col className="layoytlog " span={10} style={{ height: '100%', width: '100%' }}>
        <img src="/img/Logoalta.png" alt="" className="mt-5" />
      <Form className="mt-5" name="forget" onFinish={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <h1 className="title">Đặt lại mật khẩu</h1>
              <label className="title2">
                Vui lòng nhập lại email để đặt lại mật khẩu của bạn
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ email!",
                  },
                ]}
                validateStatus={inputError ? "error" : ""}
                help={inputError ? errorMessage : null}
              >
                <Input
                  className={`login ${inputError ? "error-input" : "input"}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>
            </div>

            <div style={{ marginTop: "16px" }}>
              <Button className="btlogin" type="primary" htmlType="submit">
                Gửi yêu cầu
              </Button>
            </div>

            <div style={{ marginTop: "16px" }}>
              <p className={inputError ? "error-message" : "success-message"}>
                {errorMessage}
              </p>
            </div>
          </Form>
      </Col>
      <Col className="bg-home" span={14} style={{ height: '100%', width: '100%', backgroundColor:'white' }}>
        <img src="/img/Frame.png" width={848} alt="Logo" />
      </Col>
    </Row>
  );
};

export default ForgotPassword;