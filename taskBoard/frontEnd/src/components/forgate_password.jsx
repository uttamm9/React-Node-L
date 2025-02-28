import React, { useState } from 'react';
import axios from 'axios';

const ForgatePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Handle password reset logic here
      console.log('Passwords match. Proceed with password reset.', newPassword);
      axios
        .patch('http://localhost:7070/API/forgetPassword', { email, newPassword,otp })
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

const getOTP = async()=>{
  try{
  const OTP = await axios.post('http://localhost:7070/API/getOTP',{email})
  console.log("OTP",OTP)
 
  }catch(err){
    console.log('otp error',err)
  }
}

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
        <div>
          <input type="text" 
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={getOTP}>Get OTP</button>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgatePassword;