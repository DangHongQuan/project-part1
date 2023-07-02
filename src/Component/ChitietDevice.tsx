import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../reduxtoolkit/store';
import React from 'react';

function ChiTietDevice() {
  const { id } = useParams<{ id: string }>();
  const data = useSelector((state: RootState) => state.device.data);

  // Tìm kiếm dữ liệu dựa trên id từ URL Params
  const selectedData = data.find(item => item.id === id);

  // Kiểm tra xem dữ liệu đã được tìm thấy hay không
  if (!selectedData) {
    return <div>Loading...</div>; // Hoặc thông báo lỗi nếu cần
  }

  // Hiển thị chi tiết dữ liệu
  return (
    <div>
      {selectedData.id}
      {selectedData.name}
    </div>
  );
}

export default ChiTietDevice;
