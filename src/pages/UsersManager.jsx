import { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ your Firebase config
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCol = collection(db, "users");
        const snapshot = await getDocs(usersCol);
        const usersData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update role
  const updateRole = async (uid, newRole) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === uid ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Block/unblock user
  const toggleBlock = async (uid, blocked) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { blocked: !blocked });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === uid ? { ...user, blocked: !blocked } : user
        )
      );
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Blocked</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <select
                  value={user.role || "student"}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border p-2">
                {user.blocked ? "Yes" : "No"}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleBlock(user.id, user.blocked)}
                  className={`px-3 py-1 rounded text-white ${
                    user.blocked ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
