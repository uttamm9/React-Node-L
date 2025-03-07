import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import CreateTask from './components/createTask'
import Tasks from './components/Tasks'
import UpdatePassword from './components/update_password'
import Forg from './components/forgate_password'
import UploadExcel from './components/UploadExcel'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/tasks" element={<Tasks/>} />
        <Route path='/UpdatePassword' element={<UpdatePassword/>} />
        <Route path='/forgatePassword' element={<Forg/>} />
        <Route path='/uploadExcel' element = {<UploadExcel/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
