import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/common/Sidebar";
import ProfileInfo from "../components/profile/ProfileInfo";
import CustomerDashboard from "../components/profile/CustomerDashboard";
import VendorDashboard from "../components/profile/VendorDashboard";
import AdminDashboard from "../components/profile/AdminDashboard";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold text-black"
        >
          Loading profile...
        </motion.p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar role={user.role} />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="main-content flex-1 p-6 ml-64"
      >
        <ProfileInfo user={user} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          {user.role === "customer" && <CustomerDashboard />}
          {user.role === "vendor" && <VendorDashboard />}
          {user.role === "admin" && <AdminDashboard />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
