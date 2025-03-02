import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, fetchUserProfile } from "../../redux/slices/authSlice";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaStore,
  FaDollarSign,
  FaChartBar,
  FaSignOutAlt,
  FaStar,
  FaHeadset,
  FaClipboardList,
  FaChartLine,
  FaCheckCircle,
  FaBars,
} from "react-icons/fa";

// Sidebar Links for Each Role
const sidebarLinks = {
  customer: [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "My Bookings", path: "/profile/bookings", icon: <FaCalendarCheck /> },
    { name: "Favorites", path: "/profile/favorites", icon: <FaStore /> },
    { name: "Reviews", path: "/profile/reviews", icon: <FaStar /> },
    { name: "Support", path: "/profile/support", icon: <FaHeadset /> },
  ],
  vendor: [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Manage Venues", path: "/profile/venues", icon: <FaStore /> },
    { name: "Manage Events", path: "/profile/events", icon: <FaStore /> },
    { name: "Manage Bookings", path: "/profile/vendor-bookings", icon: <FaClipboardList /> },
    { name: "Earnings", path: "/profile/earnings", icon: <FaDollarSign /> },
    { name: "Analytics", path: "/profile/analytics", icon: <FaChartLine /> },
  ],
  admin: [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "User Management", path: "/profile/users", icon: <FaUsers /> },
    { name: "Approve Venues", path: "/profile/approve-venues", icon: <FaCheckCircle /> },
    { name: "Reports", path: "/profile/reports", icon: <FaChartBar /> },
    { name: "Analytics Dashboard", path: "/profile/admin-analytics", icon: <FaChartLine /> },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  // Fetch user profile on mount
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  // Toggle Sidebar & Persist State
  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(!prev));
      return !prev;
    });
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className={`fixed h-screen ${
      isCollapsed ? "w-20" : "w-64"
    } bg-[#ED7E96] text-white px-4 py-6 shadow-lg transition-all`}
  >
      {/* Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-white hover:text-black transition"
      >
        <FaBars />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        {!isCollapsed && (
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <FaHome /> EventHive
          </Link>
        )}
      </div>

      {/* Sidebar Links */}
      <nav className="mt-8">
        <ul className="space-y-4">
          <AnimatePresence>
            {loading ? (
              <p className="text-white text-center">Loading...</p>
            ) : user ? (
              sidebarLinks[user.role]?.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                      location.pathname === link.path
                        ? "bg-white text-[#ED7E96] shadow-md"
                        : "hover:bg-[#f04c6f]"
                    }`}
                  >
                    {link.icon}
                    {!isCollapsed && link.name}
                  </Link>
                </motion.li>
              ))
            ) : (
              <p className="text-white text-center">Error loading user data</p>
            )}
          </AnimatePresence>
        </ul>
      </nav>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex items-center gap-3 px-4 py-2 rounded-lg bg-white text-[#ED7E96] hover:bg-black hover:text-white transition w-full"
      >
        <FaSignOutAlt /> {!isCollapsed && "Logout"}
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
