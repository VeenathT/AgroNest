import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/dealer/registerDealer', {
        name: name,
        address: address,
        email: email,
        phone: phone,
        storeLocation: storeLocation,
        username: username,
        password: password,
        reEnteredPassword: reEnteredPassword
      });

      console.log('Signup successful:', response.data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Signup error:', error.response.data);
          } else {
            console.error('Signup error:', error.message); // Log the error message if response.data is undefined
          }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Store Location:</label>
          <input type="text" value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Re-enter Password:</label>
          <input type="password" value={reEnteredPassword} onChange={(e) => setReEnteredPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
