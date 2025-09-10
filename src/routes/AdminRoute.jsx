import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx"; // adjust path if different

const AdminRoute = ({ children }) => {
  const { currentUser, userRole } = useUser();
  // assume your AuthContext provides userRole (like "admin", "student")

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />; // redirect normal users
  }

  return children; // allow access
};

export default AdminRoute;
