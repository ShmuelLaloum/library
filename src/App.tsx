import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Admin from "./pages/Admin";
import "./styles/style.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
