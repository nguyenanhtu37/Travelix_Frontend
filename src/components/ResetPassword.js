import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }
        
          try {
            console.log('Sending reset password request with token:', token);
            const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
            if (response.status === 200) {
              alert('Password reset successfully');
              navigate('/login');
            }
          } catch (error) {
            console.error('Error resetting password:', error);
            alert(error.response.data || 'Error resetting password');
          }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword}>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
