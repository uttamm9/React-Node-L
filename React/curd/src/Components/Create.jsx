import React, { Children } from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import './Create.css'
// import popup from './popup'

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: ''
  })
  const [allStudenta ,setallStudenta] = useState([])
  const [module, setModule] = useState(false)
  const [edituser, setEdituser] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing formData
      [name]: value // Update the field, given the name and value passed
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('form data=> ', formData);
    try {
      await axios.post('http://localhost:5050/std/add', {...formData});
      alert('Student created successfully!');
      setFormData({name: '', email: '', batch: ''});
    } catch (error) {
      console.error('There was an error creating the student!', error);
    }
  }
  
  const getstudents = async()=>{
    try {
      const result = await axios.get('http://localhost:5050/std/findAll')
      // console.log(result.data)
      setallStudenta(result.data)
      document.getElementById('table').style.display = 'block'
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getstudents()
  },[])

  const hideData = () => {
    setallStudenta([])
    document.getElementById('table').style.display = 'none'
  }

  const Delete = async(id)=>{
      console.log("delete id",id)
      try {
        await axios.delete('http://localhost:5050/std/delete/'+id)
        alert('delete successfully')
        getstudents()
      } catch (error) {
        console.log('error',error)
      }
  }

  const update = async(id) => {
    console.log('update id', id)
    try {
      const result = await axios.patch('http://localhost:5050/std/update', { id, ...edituser })
      console.log(result)
      alert('update successfully')
      getstudents() // Fetch updated data after update
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', margin: '20px', gap: '20px' }}>
      <form onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="name">Name</label>
          <input 
          type="text"
           name="name" 
           id="name"
            value={formData.name}
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="email">Email</label>
          <input
           type="email" 
           name="email" 
           id="email" 
           onChange={handleChange}
           value={formData.email}
           style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="phone">Phone</label>
          <input 
          type="tel" 
          name="batch" 
          id="batch" 
          onChange={handleChange}
          value={formData.batch}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <button type="submit" style={{ padding: '10px 15px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}
          >Create</button>
        </div>
      </form>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <button onClick={getstudents} style={{ padding: '10px 15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>All student</button>

          <button onClick={hideData} style={{ padding: '10px 15px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }} >Hide data</button>
        </div>
        <div style={{ marginTop: '20px' }} id='table'>
          <h1>All student</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{backgroundColor:'lightgray'}}>
              <th scope='col' className='thcss'>S.N.</th>
              <th scope='col' className='thcss'>Name</th>
              <th scope='col' className='thcss'>Email</th>
              <th scope='col' className='thcss'>Phone</th>
              <th scope='col' className='thcss'>Update</th>
              <th scope='col'className='thcss'>Delete</th>
            </tr>
            </thead>
          <tbody>
            {allStudenta.map((item, index) => (
              <tr key={item._id} >
                <th scope='row' className='thcss'>
                  {index + 1}</th>
                <td className='thcss'>
                  {item.name}</td>
                <td className='thcss'>
                  {item.email}</td>
                <td className='thcss'>
                  {item.batch}</td>
                <td className='thcss'>
                  <button className='updateButton' onClick={()=>{setModule(true), setEdituser(item)} } >Update</button>
                </td>
                <td className='thcss'>
                  <button style={{ padding: '5px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }} onClick={()=>Delete(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>

        <div>
          {module && (
            <div style={{ width: '300px', color: 'white' }}>
              <form onSubmit={update}>
                <div className='popup-inner'>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={edituser.name}
                    onChange={(e)=>setEdituser({...edituser,name:e.target.value})}
                  />
                </div>
                <div className='popup-inner'>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={edituser.email}
                    onChange={(e)=>setEdituser({...edituser,email:e.target.value})}
                  />
                </div>
                <div className='popup-inner'>
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="batch"
                    value={edituser.batch}
                    onChange={(e)=>{setEdituser({...edituser,batch:e.target.value})}}
                  />
                </div>
                <button onClick={()=>setModule(flase)}>cancel</button>
                <button type="submit" onClick={()=>{update(edituser._id)}}>Save change</button>
              </form>
            </div>
          )}
        </div>
      </div>
    
  )
}

export default Create