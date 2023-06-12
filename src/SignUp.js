import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/signup', {
        name,
        email,
        mobile,
        password,
      });
      console.log('Signup response:', response.data);
      // Handle successful signup, e.g., redirect to another page
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error, e.g., display an error message
    }
  };

  return (
    <div className='container'>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
