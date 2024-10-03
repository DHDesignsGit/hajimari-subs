import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Přidáš hook z AuthContextu

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Kontroluješ, zda je uživatel přihlášen

  return currentUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
