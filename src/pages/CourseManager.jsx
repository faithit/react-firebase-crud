// src/pages/CourseManager.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";

export default function CourseManager() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch courses
  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add course
  const handleAdd = async () => {
    if (!title.trim()) return;
    await addDoc(collection(db, "courses"), {
      title,
      description,
      createdAt: serverTimestamp()
    });
    setTitle("");
    setDescription("");
    fetchCourses();
  };

  // Update course
  const handleUpdate = async (id) => {
    const courseRef = doc(db, "courses", id);
    await updateDoc(courseRef, { title, description });
    setEditingId(null);
    setTitle("");
    setDescription("");
    fetchCourses();
  };

  // Delete course
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  return (
    <div className="container mt-4">
      <h2>📚 Course Manager</h2>

      {/* Form */}
      <div className="card p-3 mb-4">
        <h5>{editingId ? "✏️ Edit Course" : "➕ Add Course"}</h5>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {editingId ? (
          <button
            className="btn btn-warning"
            onClick={() => handleUpdate(editingId)}
          >
            Update
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Course
          </button>
        )}
      </div>

      {/* Course List */}
      <div>
        <h5>All Courses</h5>
        {courses.length === 0 && <p>No courses yet.</p>}
        <ul className="list-group">
          {courses.map((c) => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{c.title}</strong>
                <p className="mb-0">{c.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => {
                    setEditingId(c.id);
                    setTitle(c.title);
                    setDescription(c.description);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
