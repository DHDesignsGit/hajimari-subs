import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Administration from "./pages/Administration";
import Main from "./layouts/Main";
import LoginBackground from "./modules/AuthBackground";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginBackground className="background" /> } >
        <Route path="/" element={<Main />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/auth" element={<Auth />} /> 
        <Route path="/administration" element={<Administration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
