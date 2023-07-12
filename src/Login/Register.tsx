import React, { useEffect, useState } from 'react';
import { registerUser } from '../Firebase/Firebase';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reduxtoolkit/store';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchrolesData } from '../reduxtoolkit/RolesActions';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<File | any>(null);

  const handleRegister = () => {
    if (image) {
      registerUser(name, email, password, address, phone, role, status, image);
    }
  }; 
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { dataroles } = useSelector((state: RootState) => state.roles);
  

  useEffect(() => {
      dispatch(fetchrolesData());
  }, [dispatch]);

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <select
        onChange={(e) => setRole(e.target.value)}
        className="slectTop slv ms-4" >
        <option></option>
        {dataroles.map((item) => (

          <option key={item.name} value={item.name}>
            {item.name}
          </option>

        ))}
      </select>
      <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
