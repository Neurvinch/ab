import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Adtt from "./pages/AdminTimeTable.jsx"
import Profile from './pages/Profile.jsx'
import StudentLeaveRequest from './pages/StudentLeaveRequest.jsx'
import LeaveApproval from './pages/LeaveApproval.jsx'
import StudentLeaveStatus from './pages/StudentLeaveStatus.jsx'
import InternalMarkUpload from './pages/InternalMarkUpload.jsx'
import StudentInternalMarks from './pages/StudentInternalMarks.jsx'


function App() {
 

  return (

    <>
    <Router>
  <Routes>
      <Route  path='/signup' element={<Register/> }  />
      <Route  path='/login' element = {<Login/>}    />
      <Route  path='/dashboard' element={ <Dashboard/>}/>
      <Route path='/timetable' element = { <Adtt/>} />
      <Route  path='/profile' element = {<Profile/>}  />
      <Route  path='/leaveRequest' element = {<StudentLeaveRequest/>}  />
      <Route  path='/leaveRequestAdmin' element = {<LeaveApproval/>}  />
      <Route  path='/leaveStatus'  element = {<StudentLeaveStatus/>}       />
      <Route  path='/uploadMarks' element = { <InternalMarkUpload/>}   />
      <Route  path='/MarksView' element = { <StudentInternalMarks/>}   />
  </Routes>
    </Router>

    </>
     
  )
}

export default App
