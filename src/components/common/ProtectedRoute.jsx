import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect if role not allowed
  }

  return <Outlet />;
};

export default ProtectedRoute;
