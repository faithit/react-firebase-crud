import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route ,BrowserRouter} from 'react-router-dom';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import StudentList from "./components/StudentList.jsx";
import AddStudent from "./components/Addstudent.jsx";
import EditStudent from "./components/EditStudent.jsx";

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

      />
           </Routes>
      </BrowserRouter>

  )
}

export default App
