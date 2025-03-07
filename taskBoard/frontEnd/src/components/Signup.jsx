import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    address: '',
    color: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (file) {
      data.append('file', file.file);
    }
    axios.post('http://localhost:7070/API/signup', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('Data saved', res);
        alert(res.data.message);
        navigate('/login');
      })
      .catch((err) => {
        console.log('Error saving data', err);
        alert(err.response.data.message);
      });
    console.log('Form Data Submitted: ', formData);

  };

  const style = {
    container : {display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
    form:{ display: 'flex', flexDirection: 'column', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' },
    input:{ width: '100%', padding: '8px', boxSizing: 'border-box' }
  }

  return (
    <div style={style.container}>
      <form onSubmit={handleSubmit} style={style.form}>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} required style={style.input} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} required style={style.input} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} required style={style.input} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="file" name='file' onChange={(e) => setFile({file: e.target.files[0] })} style={style.input}/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select name="role" value={formData.role} onChange={handleChange} required style={style.input}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="address" placeholder='Address' value={formData.address} onChange={handleChange} required style={style.input} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Favorite Color:</label>
          <input type="color" name="color" value={formData.color} onChange={handleChange} required style={style.input} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required style={style.input} />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={() => navigate('/login')} style={{ padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Already have an account?</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;