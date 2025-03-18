import React, { use } from 'react'
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { get } from '../../../backend/routers/userRoute';
const Tasks = () => {
  const [tasks, setMyTask] = useState([]);
  const [assignedTasks, setMyAssignedTask] = useState([]);
  const [module, setModule] = useState(false);
  const [edituser, setEdituser] = useState(null);
  const color = localStorage.getItem('color'); 
  const profile = localStorage.getItem('profilephoto')
  const [completetask, setCompleteTask] = useState([])
  const [ArchiveTask,setArchiveTask] = useState([])
  const [getCompletedTaskList, setgetCompleteTaskList] = useState(false)
  const [archiveModel, setArchiveModel] = useState(false)
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

  const getArchiveTask = async()=>{
    try {
      const response = await axios.get('http://localhost:7070/API/getArchiveTask', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("My Archive Task",response.data);
      setArchiveTask(response.data)
    }
    catch (error) {
      console.error(error);
     
    }
  }

  useEffect(() => {
    getMyTask();
    getMyAssignedTask();
    getArchiveTask()
  },[]);
  
  const style = {
    container :{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#555', backgroundColor: color, width: '1210px' ,height:'100vh'},
    logout:{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    createTask:{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    thtd:{ border: '1px solid #ddd', padding: '8px' },
    popup_overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {width: '100%',padding: '8px', marginTop: '5px',border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
    },
    lable:{fontWeight:'bold',color:'#f1f1f1'},
    buttonHover: {
      '&:hover': {
        backgroundColor: '#e68900'
      }
    }
    }

  return (
    <div style={style.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  {/* First div aligned to the right */}
  <div style={{margin: '10px', display: 'flex', alignItems: 'center', gap: '10px', 
 padding: '5px'}}> 
  <div>
    <h2 style={{ margin: 0 }}>Hi {localStorage.getItem('name')}</h2>
  </div>
  <div style={{ border: '1px solid black', height: '30px', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    borderRadius: '50%'  }}>
    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={profile} alt="Profile" />
  </div>
</div>

  {/* Second div aligned to the left */}
  <div style={{ display: 'flex', gap: '10px' }}>
    <button onClick={() => {
      localStorage.clear();
      Navigate('/login');
    }} 
    style={style.logout}>
      Logout
    </button>

    <button onClick={() => Navigate('/createTask')} 
    style={style.createTask}>
      Create Task
    </button>
  </div>
</div>
            <div style={{ marginBottom: '10px' }}>
            <h1 style={{ color: '#555' }}>My Tasks</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
              <th style={style.thtd}>Task Name</th>
              <th style={style.thtd}>Due Date</th>
              <th style={style.thtd}>Status</th>
              <th style={style.thtd}>Remark</th>
              <th style={style.thtd}>Assigned By</th>
              <th style={style.thtd}>Complete</th>
              <th style={style.thtd}>Archive</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td style={style.thtd}>{task.taskName}</td>
                <td style={style.thtd}>{task.dueDate.slice(0,10)}</td>
                <td style={style.thtd}>{task.status}</td>
                <td style={style.thtd}>{task.remark}</td>
                <td style={style.thtd}>{task.assingBy.name}</td>
                <td style={style.thtd}><button
                style={{backgroundColor:'green'}}
                 onClick={()=>{completedTask(task)}}>Complete</button></td>
                 <td style={style.thtd}>
                  <button onClick={()=>{archiveTask(task)}}>Archive</button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <span>Pending Task {tasks.length}</span> <br />
            <button onClick={()=>setgetCompleteTaskList(!getCompletedTaskList)} >complete Task  {completetask.length}</button>
            <button onClick={() => setArchiveModel(!archiveModel)}>Archive {ArchiveTask.length}</button>
           {getCompletedTaskList && <table>
            <thead>
            <tr>
              <th style={style.thtd}>Task Name</th>
              <th style={style.thtd}>Due Date</th>
              <th style={style.thtd}>Status</th>
              <th style={style.thtd}>Remark</th>
              <th style={style.thtd}>Assigned By</th>
              
            </tr>
          </thead>
          <tbody>
            {completetask.map((task, index) => (
              <tr key={index}>
                <td style={style.thtd}>{task.taskName}</td>
                <td style={style.thtd}>{task.dueDate.slice(0,10)}</td>
                <td style={style.thtd}>{task.status}</td>
                <td style={style.thtd}>{task.remark}</td>
                <td style={style.thtd}>{task.assingBy.name}</td>
                
              </tr>
            ))}
          </tbody>
          </table> }
          {archiveModel&& <table>
            <thead>
            <tr>
              <th style={style.thtd}>Task Name</th>
              <th style={style.thtd}>Due Date</th>
              <th style={style.thtd}>Status</th>
              <th style={style.thtd}>Remark</th>
              <th style={style.thtd}>Assigned By</th>
            </tr>
          </thead>
          <tbody>
            {ArchiveTask.map((task,index)=>{
              return (
                <tr key={index}>
                  <td style={style.thtd}>{task.taskName}</td>
                  <td style={style.thtd}>{task.dueDate.slice(0,15)}</td>
                  <td style={style.thtd}>{task.status}</td>
                  <td style={style.thtd}>{task.remark}</td>
                  <td style={style.thtd}>{task.assingBy.name}</td>
                </tr>
              );
            })}
          </tbody>
            </table>}
        </div>
      </div>
      <div>
        <h1 style={{ color: '#555' }}>My Assigned Task</h1>
            <table>
              <thead>
                <tr>
                  <th style={style.thtd}>Task Name</th>
                  <th style={style.thtd}>Due Date</th>
                  <th style={style.thtd}>Status</th>
                  <th style={style.thtd}>Remark</th>
                  <th style={style.thtd}>Assigned To</th>
                  <th style={style.thtd}>Update</th>
                  <th style={style.thtd}>Delete</th>
                </tr>
                
              </thead>
              <tbody>
                {assignedTasks.map((assignedTasks, index) => (
                  <tr key={index}>
                    <td style={style.thtd}>{assignedTasks.taskName}</td>
                    <td style={style.thtd}>{assignedTasks.dueDate.slice(0,10)}</td>
                    <td style={style.thtd}>{assignedTasks.status}</td>
                    <td style={style.thtd}>{assignedTasks.remark}</td>
                    <td style={style.thtd}>{assignedTasks.assignTo.name}</td>
                    <td style={style.thtd}><button onClick={()=>{setModule(true), setEdituser(assignedTasks)}}>Update</button></td>
                    <td style={style.thtd}><button onClick={()=>Delete(assignedTasks._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
      <div>
        {module && (
              <div style={style.popup_overlay}>
                <form onSubmit={update}>
                  <div style={style.popup_inner}>
                    <label style={style.lable}>Task Name:</label>
                    <input
                      type="text"
                      name="taskName"
                      value={edituser.taskName}
                      onChange={(e)=>setEdituser({...edituser,taskName:e.target.value})}
                      style={style.input}
                    />
                  </div>
                  <div>
                    <label style={style.lable}>Due date:</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={edituser.dueDate}
                      onChange={(e)=>setEdituser({...edituser,dueDate:e.target.value})}
                      style={style.input}
                    />
                  </div>
                  <div className='popup-inner'>
                    <label style={style.lable}>Remark:</label>
                    <input
                      type="text"
                      name="remark"
                      value={edituser.remark}
                      onChange={(e)=>{setEdituser({...edituser,remark:e.target.value})}}
                      style={style.input}
                    />
                  </div>
                  <button type="submit" onClick={()=>{update(edituser._id)}} style={style.buttonHover['&:hover']}>Save change</button>
                  <button onClick={()=>{setModule(false)}}>cancel</button>
                </form>
              </div>
        )}
      </div>
    </div>
  );
}

export default Tasks