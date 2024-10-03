import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth(); // Kontrolujeme roli i přihlášení

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" />; // Nebo přesměrovat kamkoliv, pokud uživatel není admin
  }

  return children;
};

export default AdminRoute;
