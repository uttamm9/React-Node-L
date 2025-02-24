import React, { use } from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
const Tasks = () => {
  const [tasks, setMyTask] = useState([]);
  const [assignedTasks, setMyAssignedTask] = useState([]);
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
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task._id}</td>
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
                </tr>
              </thead>
              <tbody>
                {assignedTasks.map((assignedTasks, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.taskName}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.dueDate}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.status}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.remark}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.assignTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
  );
}

export default Tasks