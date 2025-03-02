import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerBookings, cancelBooking } from "../../redux/slices/bookingSlice";
import { motion } from "framer-motion";
import { FaHeart, FaTrash, FaCalendarCheck } from "react-icons/fa";
import { toast } from "react-toastify";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { bookings = [], loading, error } = useSelector((state) => state.booking || {});
  const { user } = useSelector((state) => state.auth || {});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect System Theme Preference
  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // Fetch Bookings on Component Mount
  useEffect(() => {
    dispatch(fetchCustomerBookings());
  }, [dispatch]);

  // Handle Booking Cancellation
  const handleCancel = (bookingId) => {
    dispatch(cancelBooking(bookingId));
    toast.success("Booking cancelled successfully!");
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mt-6 bg-white p-6 rounded-lg shadow-xl border-2 border-[#ED7E96] w-full max-w-4xl mx-auto"
    >
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarCheck className="text-[#ED7E96] text-3xl" />
        <h2 className="text-3xl font-bold text-black">My Bookings</h2>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error loading bookings: {error}</p>}

      {/* Bookings Section */}
      {loading ? (
        <p className="text-gray-500 text-lg animate-pulse">Loading bookings...</p>
      ) : !Array.isArray(bookings) || bookings.length === 0 ? (
        <p className="text-gray-500 text-lg italic">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-5 border-2 border-[#ED7E96] rounded-lg shadow-md bg-white flex justify-between items-center hover:shadow-2xl transition duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-black">{booking.venueName}</h3>
                <p className="text-gray-600">Date: {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}</p>
                <p className="text-gray-600">Status: {booking.status || "Pending"}</p>
              </div>
              {booking.status !== "Completed" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition shadow-md"
                >
                  <FaTrash /> Cancel
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Favorite Venues Section */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-10">
        <div className="flex items-center gap-3 mb-4">
          <FaHeart className="text-[#ED7E96] text-3xl" />
          <h2 className="text-3xl font-bold text-black">Favorite Venues</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {user?.favorites?.length > 0 ? (
            user.favorites.map((venue) => (
              <motion.div
                key={venue._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-3 hover:shadow-xl transition"
              >
                <img
                  src={venue.image || "https://via.placeholder.com/80"}
                  alt={venue.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-black">{venue.name}</h3>
                  <p className="text-gray-600">{venue.location || "No location provided"}</p>
                </div>
                <FaHeart className="text-red-500 text-2xl" />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-lg italic">No favorite venues yet.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerDashboard;
