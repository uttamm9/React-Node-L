import React, { use } from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Tasks = () => {
  const [tasks, setMyTask] = useState([]);
  const [assignedTasks, setMyAssignedTask] = useState([]);
  const [module, setModule] = useState(false);
  const [edituser, setEdituser] = useState(null);
  const color = localStorage.getItem('color'); 
  const [completetask, setCompleteTask] = useState([])
  const [getCompletedTaskList, setgetCompleteTaskList] = useState(false)
  const Navigate = useNavigate();
  const getMyTask = async () => {
    try {
      const response = await axios.get('http://localhost:7070/API/getTask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("My Task",response.data);
      const completetask = []
      const pendingtask = []
      {response.data.map((task)=>{
        if(task.status === "Complete"){
          completetask.push(task)
        }else{
         pendingtask.push(task)
        }
      })}
      setMyTask(pendingtask)
      setCompleteTask(completetask)

    }
    catch (error) {
      console.error(error);
      alert(err.response.data.message);
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
      alert(err.response.data.message);
    }
  }

  const update = async()=>{
    console.log('form data=> ', edituser);
    try {
      const result = await axios.patch(`http://localhost:7070/API/updateTask/${edituser._id}`, {...edituser},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
    }
      );
      alert('Task updated successfully!');
      console.log('updated data',result.data);
      setEdituser({taskName: '', dueDate: '', status: '', remark: '', assignTo: ''});
    } catch (error) {
      console.error('There was an error updating the task!', error);
      alert(err.response.data.message);
    } 
  }

  const Delete = async(id)=>{
    console.log("delete id",id)
    try {
      await axios.delete(`http://localhost:7070/API/deleteTask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
    });
      alert('Task deleted successfully');
      getMyAssignedTask();
    }
    catch (error) {
      console.error('There was an error deleting the task!', error);
      alert(err.response.data.message);
    }
  }

  const archiveTask = async(task) => {
    console.log("Archive id", task);
    try {
      const response = await axios.request({
        method: 'delete',
        url: 'http://localhost:7070/API/archiveTask',
        data: { ...task },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(response.data.message);
      getMyTask();
    } catch (error) {
      console.error('There was an error completing the task!', error);
      alert(err.response.data.message);
    }
  }

  const completedTask = async(task)=>{
    console.log("completed task ID",task._id)
    try {
      const response = await axios.request({
        method:"post",
        url:'http://localhost:7070/API/completetask',
        data:{...task},
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      alert(response.data.message)
      getMyTask()
    } catch (error) {
      console.error('There was an error completing the task!', error);
      alert(err.response.data.message);
    }
  }

  useEffect(() => {
    getMyTask();
    getMyAssignedTask();
  },[]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#555', backgroundColor: color, width: '1210px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
          
        <button onClick={() => {
            localStorage.clear();
          
            Navigate('/login');
            }} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
            </button>
            <button onClick={() => Navigate('/createTask')} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>
            Create Task
            </button>
        </div>
        
            </div>
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
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Complete</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Archive</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.taskName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.dueDate.slice(0,10)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.remark}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.assingBy.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><button
                style={{backgroundColor:'green'}}
                 onClick={()=>{completedTask(task)}}>Complete</button></td>
                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={()=>{archiveTask(task)}}>Archive</button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <span>Pending Task {tasks.length}</span> <br />
            <button onClick={()=>setgetCompleteTaskList(!getCompletedTaskList)} >complete Task  {completetask.length}</button>
           {getCompletedTaskList && <table>
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
            {completetask.map((task, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.taskName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.dueDate.slice(0,10)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.remark}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.assingBy.name}</td>
                
              </tr>
            ))}
          </tbody>
          </table> }
        </div>
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
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{assignedTasks.dueDate.slice(0,10)}</td>
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