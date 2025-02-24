import React, { useState } from 'react';
import axios from 'axios';

const ForgatePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Handle password reset logic here
      console.log('Passwords match. Proceed with password reset.', newPassword);
      axios
        .patch('http://localhost:7070/API/forgetPassword', { email, newPassword })
        .then((res) => {
          console.log(res);
          alert('Password reset successful.');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Passwords do not match.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgatePassword;