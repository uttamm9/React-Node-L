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
          alert(res.data.message)
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message)
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
    // alert(err.respo)
  }
}

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: 'calc(70% - 10px)', padding: '8px', boxSizing: 'border-box', marginRight: '10px' }}
          />
          <button type="button" onClick={getOTP} style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }}>Get OTP</button>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgatePassword;