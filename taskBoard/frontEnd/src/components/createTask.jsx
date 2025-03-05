import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  const CreateTask = () => {
    const [task, setTask] = useState({
      taskName: '',
      dueDate: '',
      assignTo: '',
      remark: ''
    });
    const color = localStorage.getItem('color');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [minDate, setMinDate] = useState('');

    const SetDate = ()=>{
      const today = new Date().toISOString().split('T')[0];
      setMinDate(today)
    }

    useEffect(() => {
      fetchUsers();
      SetDate()
    }, []);

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7070/API/getuser',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      });
        console.log(`>>>>>>>`,response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(`//////////`,error);
      }
    };
    

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
      axios.post('http://localhost:7070/API/createTask', { ...task },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
    }
      )
        .then((response) => {
          console.log(response.data);
          alert('Task created successfully');
          navigate('/tasks');
        })
        .catch((error) => {
          console.log("error",error);
          alert(error.response.data.message)
        });
    };

    return (
      <div
  style={{backgroundColor: color,minHeight: "90vh",width: "1270px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  }}
>
  <form
    onSubmit={handleSubmit}
    style={{
      background: "white",
      padding: "1.9rem",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      width: "400px",
      textAlign: "left",
    }}
  >
    <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}>
      Create Task
    </h2>
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: "bold", color: "#555" }}>Task Name:</label>
      <input
        type="text"
        name="taskName"
        value={task.taskName}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
        }}
      />
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: "bold", color: "#555" }}>Due Date:</label>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
        min={minDate}
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
        }}
      />
    </div>

    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: "bold", color: "#555" }}>Assign To:</label>
      <select
        name="assignTo"
        value={task.assignTo}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
          background: "white",
          color:"black"
        }}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user.email} style={{color:'black'}}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ fontWeight: "bold", color: "#555" }}>Remark:</label>
      <textarea
        name="remark"
        value={task.remark}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
          minHeight: "80px",
        }}
      ></textarea>
    </div>
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "6px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        background: "#28a745",
        color: "white",
        transition: "0.3s",
      }}
      onMouseOver={(e) => (e.target.style.background = "#218838")}
      onMouseOut={(e) => (e.target.style.background = "#28a745")}
    >
      Create Task
    </button>
  </form>

  <div style={{ marginTop: "1rem" }}>
    <button
      onClick={() => navigate("/tasks")}
      style={{
        background: "#007bff",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        fontSize: "1rem",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
      }}
      onMouseOver={(e) => (e.target.style.background = "#0056b3")}
      onMouseOut={(e) => (e.target.style.background = "#007bff")}
    >
      Tasks
    </button>
  </div>

  <button
    onClick={() => navigate("/UpdatePassword")}
    style={{
      marginTop: "1rem",
      background: "#ffc107",
      color: "#333",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.target.style.background = "#e0a800")}
    onMouseOut={(e) => (e.target.style.background = "#ffc107")}
  >
    Update Password
  </button>
</div>

    );
  };



export default CreateTask;