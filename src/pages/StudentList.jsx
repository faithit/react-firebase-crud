
import { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {useUser} from "../context/UserContext.jsx";

export default function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const studentsCollectionRef = collection(db, "students");
  const { userRole } = useUser();
  // Fetch students
  const getStudents = async () => {
    const data = await getDocs(studentsCollectionRef);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const studentDoc = doc(db, "students", id);
    await deleteDoc(studentDoc);
    getStudents();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Student Manager Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
{/* Only show Add Student button for Admins */}
      {userRole === "admin" && (
      <div className="mb-3">
        <Link to="/add-student" className="btn btn-success">
          Add Student
        </Link>
      </div>
            )}

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Students List</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td>{student.phone}</td>
                   {userRole === "admin" && (
                  <td>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>

                    <Link to={`/edit-student/${student.id}`}
                        className="btn btn-sm btn-primary">
                        UPDATE</Link>
                  </td>
                   )}
                </tr>
              ))}
              {students.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No students found.
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
