import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/slices/userSlice";
import { fetchPendingVenues, approveVenue, rejectVenue } from "../../redux/slices/venueSlice";
import { fetchAllBookings } from "../../redux/slices//bookingSlice";
import { motion } from "framer-motion";
import { FaUser, FaCheckCircle, FaTimesCircle, FaTrash, FaBuilding, FaChartBar } from "react-icons/fa";
import { toast } from "react-toastify";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector((state) => state.user);
  const { venues, loading: venuesLoading } = useSelector((state) => state.venue);
  const { bookings, loading: bookingsLoading } = useSelector((state) => state.booking);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect System Theme Preference
  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // Fetch Data on Component Mount
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPendingVenues());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  // Handle User Deletion
  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    toast.success("User deleted successfully!");
  };

  // Handle Venue Approval
  const handleApproveVenue = (venueId) => {
    dispatch(approveVenue(venueId));
    toast.success("Venue approved!");
  };

  // Handle Venue Rejection
  const handleRejectVenue = (venueId) => {
    dispatch(rejectVenue(venueId));
    toast.error("Venue rejected!");
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mt-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg"
    >
      {/* Users Management */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        {usersLoading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <motion.div
                key={user._id}
                className="p-4 border rounded-lg shadow-md flex justify-between items-center bg-gray-100 dark:bg-gray-800"
              >
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">Role: {user.role}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:text-red-600 flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Venue Approval Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Venue Approvals</h2>
        {venuesLoading ? (
          <p className="text-gray-500">Loading venues...</p>
        ) : venues.length === 0 ? (
          <p className="text-gray-500">No pending venues.</p>
        ) : (
          <div className="space-y-4">
            {venues.map((venue) => (
              <motion.div
                key={venue._id}
                className="p-4 border rounded-lg shadow-md flex justify-between items-center bg-gray-100 dark:bg-gray-800"
              >
                <div>
                  <h3 className="text-lg font-semibold">{venue.name}</h3>
                  <p className="text-gray-600">Location: {venue.location}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApproveVenue(venue._id)}
                    className="text-green-500 hover:text-green-600 flex items-center gap-2"
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button
                    onClick={() => handleRejectVenue(venue._id)}
                    className="text-red-500 hover:text-red-600 flex items-center gap-2"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Bookings Overview */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Bookings Overview</h2>
        {bookingsLoading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : (
          <div className="p-4 border rounded-lg shadow-md flex items-center gap-4 bg-blue-100 dark:bg-blue-800">
            <FaChartBar className="text-blue-500 text-3xl" />
            <div>
              <p className="text-lg font-semibold">{bookings.length}</p>
              <p className="text-gray-600">Total Bookings</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
