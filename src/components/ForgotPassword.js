import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      alert('A reset link has been sent to your email address');
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert('Error sending reset link');
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
