import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Administration from "./pages/Administration";
import Main from "./layouts/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
