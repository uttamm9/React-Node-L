import './App.css'
// import Login from './Components/login'
import Login from './Components/Login'
import Signup from './Components/signup'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Create from './Components/Create'
import BMI_Claculater from './Components/BMI_Claculater'

function App() {

  return (
    
    <div>
      <BMI_Claculater/>
     
     
      {/* <Router>
       <Routes>
        <Route path='/' element = { <Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/add' element = {<Create/>}/>

       </Routes>
      </Router> */}

         </div>
  )
}

export default App