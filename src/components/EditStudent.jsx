import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      const studentDoc = doc(db, "students", id);
      const studentSnap = await getDoc(studentDoc);
      if (studentSnap.exists()) {
        const data = studentSnap.data();
        setName(data.name);
        setAge(data.age);
        setCourse(data.course);
        setPhone(data.phone);
      }
    };
    fetchStudent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const studentDoc = doc(db, "students", id);
    await updateDoc(studentDoc, { name, age, course, phone });
    alert("Student Updated!");
    navigate("/"); // back to dashboard
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <h2 className="text-center mb-4">Edit Student</h2>
        <form onSubmit={handleUpdate}>
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
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}
