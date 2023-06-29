import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  // Lấy thông tin người dùng từ localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const handleLogout = () => {
    // Xử lý đăng xuất tại đây (ví dụ: xóa thông tin đăng nhập, đặt lại trạng thái, v.v.)
    // Sau đó, chuyển hướng về trang đăng nhập
    // Ví dụ: xóa thông tin người dùng trong localStorage
    localStorage.removeItem('userData');
    navigate('/l');
  };
  return (
    <div>
      <h3>Name: {userData.name}</h3>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
    <img src={userData.imageURL} alt='quan'/>
    <button onClick={handleLogout}>đăng xuất </button>
      {/* Hiển thị các thông tin khác của người dùng */}
    </div>
  );
};

export default ProfilePage;
