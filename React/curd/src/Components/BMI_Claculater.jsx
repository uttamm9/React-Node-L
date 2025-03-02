import React, { useState } from 'react'
import axios from 'axios';
const BMI_Claculater = () => {
  const [model , setModel] = useState(false)
  const [data,setData] =useState(null)
  const [formData, setFormData] = useState({
    age:'',
    gender:'',
    height:'',
    weight:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form data",formData)
    try {
      const result = await axios.post('http://localhost:8080/BMI',{...formData})
      console.log("result",result)
      setData(result)
      setModel(true)
    } catch (error) {
      
    }
  };
  
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    formGroup: {
      marginBottom: '15px'
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '5px 0',
      boxSizing: 'border-box'
    },
    button: {
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.container}>
      <h2>BMI Calculator</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Calculate BMI</button>
      </form>
      {model && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#e9e9e9' }}>
          <h3>Result</h3>
          <p>BMI: {data.data.bmi}</p>
          <p>Status: {data.data.status}</p>
        </div>
      )}
    </div>
  );


};


export default BMI_Claculater