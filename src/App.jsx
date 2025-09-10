import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import StudentList from "./pages/StudentList.jsx";
import AddStudent from "./components/Addstudent.jsx";
import EditStudent from "./components/EditStudent.jsx";
import CourseManager from "./pages/CourseManager.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import UsersManager from "./pages/UsersManager.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
           <Routes>
               <Route path='/register' element={<Register/>}/>
               <Route path='/login' element={<Login/>}/>
               <Route path="/" element={<StudentList />} />
               <Route path="/add-student" element={<AddStudent />} />
               <Route path="/edit-student/:id" element={<EditStudent />} />

               {/* Admin-only Routes */}
                <Route path="/admin" element={
                  <AdminRoute><AdminPanel/></AdminRoute>
                } />
                <Route path="/courses" element={
                  <AdminRoute><CourseManager/></AdminRoute>
                } />
                <Route path="/usermanager" element={
                  <AdminRoute><UsersManager/></AdminRoute>
                } />
      />
           </Routes>
      </BrowserRouter>

  )
}

export default App
