import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/admin/auth/Login"; // Path sesuai struktur folder Anda
import Pages from "@/pages/admin";

const AdminRoot = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pages/*" element={<Pages />} />
      </Routes>
    </Router>
  );
};

export default AdminRoot;
