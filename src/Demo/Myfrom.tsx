// import React, { useEffect } from 'react';
// import { connectDatabase, closeDatabase, connection } from '../Mysql/Mysql';

// const MyComponent: React.FC = () => {
//   useEffect(() => {
//     // Khi component được tạo ra, kết nối với cơ sở dữ liệu
//     connectDatabase();

//     // Sử dụng các câu lệnh SQL để thao tác với cơ sở dữ liệu
//     // Ví dụ: query dữ liệu từ một bảng
//     const query = 'SELECT * FROM your_table';
//     connection.query(query, (error: any, results: any) => {
//       if (error) {
//         console.error('Lỗi truy vấn:', error);
//       } else {
//         console.log('Kết quả truy vấn:', results);
//       }
//     });

//     return () => {
//       // Khi component bị hủy, đóng kết nối với cơ sở dữ liệu
//       closeDatabase();
//     };
//   }, []);

//   return <div>Your component content</div>;
// };

// export default MyComponent;
import React, { useState } from "react";
import axios from "axios";

const MyForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/data", {
        name: name,
        email: email,
      
      });

      console.log(response.data);
      // Handle success response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
     

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

