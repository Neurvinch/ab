import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Adtt from "./pages/AdminTimeTable.jsx"


function App() {
 

  return (

    <>
    <Router>
  <Routes>
      <Route  path='/signup' element={<Register/> }  />
      <Route  path='/login' element = {<Login/>}    />
      <Route  path='/dashboard' element={ <Dashboard/>}    />
      <Route path='/timetable' element = { <Adtt/>} />
  </Routes>
    </Router>

    </>
     
  )
}

export default App
