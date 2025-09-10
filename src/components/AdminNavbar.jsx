import { NavLink } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6">
      <NavLink
        to="/admin/users"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Users
      </NavLink>
      <NavLink
        to="/admin/courses"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Courses
      </NavLink>
      <NavLink
        to="/admin/moderation"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Moderation
      </NavLink>
      <NavLink
        to="/admin/analytics"
        className={({ isActive }) => isActive ? "font-bold underline" : ""}
      >
        Analytics
      </NavLink>
    </nav>
  );
};

export default AdminNavbar;
