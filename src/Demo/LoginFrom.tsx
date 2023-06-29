
  import React, { useState } from 'react';
  import { loginUser } from '../Firebase/Firebase';
  import { useNavigate } from 'react-router-dom';
  
  const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState<any | null>(null); // State để lưu trữ thông tin người dùng
    const history = useNavigate();
  
    const handleLogin = async () => {
      const user = await loginUser(email, password);
      if (user) {
        setUserData(user); // Cập nhật state userData với thông tin người dùng
        localStorage.setItem('userData', JSON.stringify(user)); // Lưu thông tin người dùng vào localStorage
        history('/profile'); // Chuyển hướng đến trang hiển thị thông tin người dùng
      }
    };
  
    return (
      <div>
        {/* Login form */}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  
  export default LoginForm;
  