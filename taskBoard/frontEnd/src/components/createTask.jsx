import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  const CreateTask = () => {
    const [task, setTask] = useState({
      taskName: '',
      dueDate: '',
      status: '',
      assignTo: '',
      remark: ''
    });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:7070/API/getuser')
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setTask({
        ...task,
        [name]: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(task);
      axios.post('http://localhost:7070/API/createTask', { ...task })
        .then((response) => {
          console.log(response.data);
          alert('Task created successfully');
          navigate('/tasks');
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Task Name:</label>
            <input type="text" name="taskName" value={task.taskName} onChange={handleChange} required />
          </div>
          <div>
            <label>Due Date:</label>
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
          </div>
          <div>
            <label>Status:</label>
            <select name="status" value={task.status} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label>Assign To:</label>
            <select name="assignTo" value={task.assignTo} onChange={handleChange} required>
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user.email}>{user.email}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Remark:</label>
            <textarea name="remark" value={task.remark} onChange={handleChange} required></textarea>
          </div>
          <button type="submit">Create Task</button>
        </form>
        <div>
          <button onClick={() => navigate('/tasks')}>
            <h3>Tasks</h3>
          </button>
        </div>
        <button onClick={() => navigate('/UpdatePassword')}>
          <h2>Update Password</h2>
        </button>
      </div>
    );
  };



export default CreateTask;