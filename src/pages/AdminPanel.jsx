// src/pages/AdminPanel.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CourseManager from "./CourseManager";
import StudentList from "./StudentList.jsx";
import UsersManager from "./UsersManager.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";  // ✅ import

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const coursesSnap = await getDocs(collection(db, "courses"));
      const studentsSnap = await getDocs(collection(db, "students"));

      setUserCount(usersSnap.size);
      setCourseCount(coursesSnap.size);
      setStudentCount(studentsSnap.size);
    };

    fetchAnalytics();
  }, []);

  return (

    <div className="container mt-4">
        <AdminNavbar/>
      <h1>📊 Admin Panel</h1>

      {/* Navigation Tabs */}
      <ul className="nav nav-tabs my-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "moderation" ? "active" : ""}`}
            onClick={() => setActiveTab("moderation")}
          >
            Moderation
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "analytics" && (
          <div className="d-flex gap-3 my-4">
            <div className="card p-3 shadow-sm">
              <h4>Users</h4>
              <p>{userCount}</p>
            </div>
            <div className="card p-3 shadow-sm">
              <h4>Courses</h4>
              <p>{courseCount}</p>
            </div>
            <div className="card p-3 shadow-sm">
              <h4>Students</h4>
              <p>{studentCount}</p>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2>👤 User Management</h2>

          </div>
        )}
        {activeTab === "users" && <UsersManager />}

        {activeTab === "students" && <StudentList />}

        {activeTab === "courses" && <CourseManager />}

        {activeTab === "moderation" && (
          <div>
            <h2>📝 Moderation</h2>
            <p>📌 Approve/reject notes/posts here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
