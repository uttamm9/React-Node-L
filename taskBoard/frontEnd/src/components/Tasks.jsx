import React, { use } from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
const Tasks = () => {
  const [tasks, setMyTask] = useState([]);
  const [assignedTasks, setMyAssignedTask] = useState([]);
  const [module, setModule] = useState(false);
  const [edituser, setEdituser] = useState(null);
  const color = localStorage.getItem('color'); 
  const getMyTask = async () => {
    try {
      const response = await axios.get('http://localhost:7070/API/getTask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("My Task",response.data);
      setMyTask(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const getMyAssignedTask = async () => {
    try {
      const response = await axios.get('http://localhost:7070/API/myAssingTask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("My Assing Task",response.data);
      setMyAssignedTask(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const update = async()=>{
    console.log('form data=> ', edituser);
    try {
      const result = await axios.patch(`http://localhost:7070/API/updateTask/${edituser._id}`, {...edituser});
      alert('Task updated successfully!');
      console.log('updated data',result.data);
      setEdituser({taskName: '', dueDate: '', status: '', remark: '', assignTo: ''});
    } catch (error) {
      console.error('There was an error updating the task!', error);
    } 
  }

  const Delete = async(id)=>{
    console.log("delete id",id)
    try {
      await axios.delete(`http://localhost:7070/API/deleteTask/${id}`);
      alert('Task deleted successfully');
      getMyAssignedTask();
    }
    catch (error) {
      console.error('There was an error deleting the task!', error);
    }
  }

  useEffect(() => {
    getMyTask();
    getMyAssignedTask();
  },[]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#555', backgroundColor: color, height: '100vh', width: '1210px' }}>
      <div style={{ marginBottom: '10px' }}>
        <h1 style={{ color: '#555' }}>My Tasks</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Task Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Due Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Remark</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assigned By</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.taskName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.dueDate}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.remark}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.assingBy.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1 style={{ color: '#555' }}>My Assigned Task</h1>
            <table>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Task Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Due Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Remark</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assigned To</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Update</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Delete</th>
                </tr>
                
              </thead>
              <tbody>
                {assignedTasks.map((assignedTasks, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.taskName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.dueDate}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.status}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.remark}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.assignTo.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={()=>{setModule(true), setEdituser(assignedTasks)}}>Update</button></td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}><button onClick={()=>Delete(assignedTasks._id)}>Delete</button></td>
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
                    <label>Task Name:</label>
                    <input
                      type="text"
                      name="taskName"
                      value={edituser.taskName}
                      onChange={(e)=>setEdituser({...edituser,taskName:e.target.value})}
                    />
                  </div>
                  <div className='popup-inner'>
                    <label>Email:</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={edituser.dueDate}
                      onChange={(e)=>setEdituser({...edituser,dueDate:e.target.value})}
                    />
                  </div>
                  <div className='popup-inner'>
                    <label>Remark:</label>
                    <input
                      type="text"
                      name="remark"
                      value={edituser.remark}
                      onChange={(e)=>{setEdituser({...edituser,remark:e.target.value})}}
                    />
                  </div>
                  <button type="submit" onClick={()=>{update(edituser._id)}}>Save change</button>
                </form>
              </div>
        )}
      </div>
    </div>
  );
}

export default Tasks