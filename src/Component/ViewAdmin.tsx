import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
interface User {
  address: string;
  email: string;
  image: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  status: string;
}
const UserImage: React.FC<{ image: string }> = ({ image }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const getUserImageURL = async (imageName: string) => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${imageName}`);
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
      } catch (error) {
        console.error('Error getting user image URL:', error);
        return '';
      }
    };

    const fetchImageUrl = async () => {
      const url = await getUserImageURL(image);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [image]);

  return <img src={imageUrl} alt="User Avatar" style={{ width: '100px' }} />;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate= useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const firestore = getFirestore();
        const usersCollection = collection(firestore, 'users');
        const querySnapshot = await getDocs(usersCollection);

        const usersData: User[] = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data() as User;
          usersData.push(userData);
        });

        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <UserImage image={user.image} />
                </td>
                <td>
                <a onClick={() => navigate(`/editAdmin/${user.email}`)}> Cập nhật</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
