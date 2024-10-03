import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Administration from "./pages/Administration";
import Main from "./layouts/Main";
import LoginBackground from "./modules/AuthBackground";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute"; // Import AdminRoute
import { AuthProvider } from "./AuthContext";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginBackground className="background" />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            >
              <Route index element={<Landing />} />
            </Route>

            {/* Nechráněné cesty */}
            <Route path="/auth" element={<Auth />} />

            {/* Cesta chráněná pouze pro adminy */}
            <Route
              path="/administration"
              element={
                <AdminRoute>
                  <Administration />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
