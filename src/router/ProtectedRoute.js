import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "../pages/NotAuthorized";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorized />} /> ✅
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer", "vendor", "admin"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* 404 Not Found Route (Optional) */}
        <Route path="*" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
