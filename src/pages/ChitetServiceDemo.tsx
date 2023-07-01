import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../reduxtoolkit/store';

function ChietTietService() {
  const { id_sv } = useParams<{ id_sv: string }>();
  const data = useSelector((state: RootState) => state.service.data);

  // Kiểm tra xem dữ liệu đã được lấy thành công hay chưa
  const selectedData = data.find(item => item.id_sv === id_sv);
  if (!selectedData) {
    return <div>Loading...</div>; // Hoặc thông báo lỗi nếu cần
  }
console.log(selectedData)
  // Hiển thị chi tiết dữ liệu
  return (
    <div>
    
     {selectedData.id}
     {selectedData.name}
     {selectedData.id_sv}
     {selectedData.describe}
     {selectedData.status}
     {selectedData.numberlever}

    </div>
  );
};

export default ChietTietService;