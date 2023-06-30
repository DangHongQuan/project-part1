import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD2_n2jaMMBF1qwAcFroeddE0ibt6p9Igs",
    authDomain: "project-1-804ed.firebaseapp.com",
    projectId: "project-1-804ed",
    storageBucket: "project-1-804ed.appspot.com",
    messagingSenderId: "1073530932270",
    appId: "1:1073530932270:web:8c81652e6d0e148cb8a3bf",
    measurementId: "G-RYEM5Y32S9"
  };

// Initialize Firebase app
initializeApp(firebaseConfig);

function SignUpForm() {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Đăng ký người dùng với email và password
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Tạo một URL tải lên cho hình ảnh
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image?.name}`);
      await uploadBytes(storageRef, image!);

      // Thêm thông tin người dùng vào Firestore
      const firestore = getFirestore();
      const userData = {
        address,
        email,
        imageURL: image?.name,
        name,
        password,
        phone,
        role,
        status,
      };
      await addDoc(collection(firestore, 'users'), userData);

      console.log('Người dùng đã được đăng ký và thông tin đã được thêm vào Firestore');
    } catch (error) {
      console.error('Lỗi khi đăng ký và thêm thông tin người dùng:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" value={address} onChange={handleAddressChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={handleEmailChange} required />

      <label htmlFor="image">Image:</label>
      <input type="file" id="image" onChange={handleImageChange} required />

      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={handleNameChange} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={handlePasswordChange} required />

      <label htmlFor="phone">Phone:</label>
      <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} required />

      <label htmlFor="role">Role:</label>
      <input type="text" id="role" value={role} onChange={handleRoleChange} required />

      <label htmlFor="status">Status:</label>
      <input type="text" id="status" value={status} onChange={handleStatusChange} required />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
