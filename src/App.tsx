import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LibraryPage from "./pages/LibraryPage";
import "./styles/style.css";

function UserWrapper() {
  const navigate = useNavigate();
  return <LibraryPage navigateTo={() => navigate("/admin")} />;
}

function AdminWrapper() {
  const navigate = useNavigate();
  return <LibraryPage navigateTo={() => navigate("/")} showMembers={true} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserWrapper />} />
        <Route path="/admin" element={<AdminWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
