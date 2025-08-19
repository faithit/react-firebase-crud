import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const studentsCollectionRef = collection(db, "students");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(studentsCollectionRef, { name, age, course, phone });
      alert("Student Added!");
      navigate("/"); // redirect back to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <h2 className="text-center mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Course"
              className="form-control"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
