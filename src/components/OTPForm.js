import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { username, name, password, confirmpassword, phone } = location.state || {};

  const handleVerifyOtp = async () => {
    console.log('Username:', username);
    console.log('OTP:', otp);
    console.log('Name:', name);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmpassword);
    console.log('Phone:', phone);

    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        username,
        otp,
        name,
        password,
        confirmpassword,
        phone,
      });

      if (response.status === 200) {
        alert('Sign up successful!');
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OTPForm;
